import "./registers.css";
import { useState } from "react";

// Lista de provedores de e-mail válidos/comuns
const DOMINIOS_VALIDOS = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "live.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br"
];

// Função que verifica se o e-mail possui um provedor real da lista
function validarEmailDominio(email) {
  if (!email || !email.includes("@")) return false;

  const partes = email.toLowerCase().trim().split("@");
  if (partes.length !== 2) return false;

  const usuario = partes[0];
  const dominio = partes[1];

  // Exige que a parte do nome tenha pelo menos 2 caracteres
  if (usuario.length < 2) return false;

  // Garante que o domínio pertence à lista de provedores válidos
  return DOMINIOS_VALIDOS.includes(dominio);
}

function Cadastro({ trocarParaLogin, onCadastroSucesso }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState(""); // Guarda APENAS números
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  function formatarNome(valor) {
    return valor.replace(/[0-9]/g, "");
  }

  function exibirCPF(valor) {
    let v = valor.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  }

  function formatarTelefone(valor) {
    let v = valor.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
  }

  // ETAPA 2: Autenticação Automática via HttpBasic (email e senha)
  async function autenticarUsuario(emailLogin, senhaLogin, cpfLimpo, nomeUsuario) {
    const credenciaisBase64 = btoa(unescape(encodeURIComponent(`${emailLogin}:${senhaLogin}`)));

    try {
      const resposta = await fetch("https://pedidos-totem.onrender.com/auth/autenticar", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credenciaisBase64}`
        },
        body: "" 
      });

      // Salva localmente o nome e CPF do usuário
      localStorage.setItem("cpf_usuario", cpfLimpo);
      localStorage.setItem("nome_usuario", nomeUsuario);

      if (resposta.ok) {
        const dadosAutenticacao = await resposta.json();
        if (dadosAutenticacao.token) {
          localStorage.setItem("token_usuario", dadosAutenticacao.token);
        }
      } else {
        console.warn("API rejeitou a autenticação automática. Ativando login local de contingência.");
      }

      // Notifica o componente pai (Menu) que o cadastro deu certo
      if (onCadastroSucesso) {
        onCadastroSucesso({ nome: nomeUsuario, cpf: cpfLimpo });
      }

    } catch (erro) {
      console.error("Erro de CORS ou rede na autenticação. Ativando login local para não travar o cliente.");
      localStorage.setItem("cpf_usuario", cpfLimpo);
      localStorage.setItem("nome_usuario", nomeUsuario);

      if (onCadastroSucesso) {
        onCadastroSucesso({ nome: nomeUsuario, cpf: cpfLimpo });
      }
    }
  }

  // ETAPA 1: Validar e Criar o usuário na API
  async function tratarEnvio(evento) {
    evento.preventDefault(); 

    // Validação estrita do provedor de e-mail
    if (!validarEmailDominio(email)) {
      alert("E-mail inválido! Por favor, insira um e-mail com um provedor válido (ex: @gmail.com, @outlook.com, @hotmail.com).");
      return; 
    }

    const dadosUsuario = {
      nome,
      email,
      cpf, 
      senha,
      telefone: telefone.replace(/\D/g, "") 
    };

    try {
      const resposta = await fetch("https://pedidos-totem.onrender.com/user/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        await autenticarUsuario(email, senha, cpf, nome);
      } else {
        const dadosErro = await resposta.json().catch(() => ({}));
        const mensagemServidor = dadosErro.message || "Verifique se o e-mail ou CPF já estão cadastrados.";
        alert(`Erro do servidor no Cadastro: ${mensagemServidor}`);
      }
    } catch (erro) {
      console.error("Erro na requisição de cadastro:", erro);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={tratarEnvio}>
        <h1>Cadastro</h1>

        <div className="input-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            minLength={5}
            value={nome}
            onChange={(e) => setNome(formatarNome(e.target.value))}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="___.___.___-__"
            maxLength={14}
            value={exibirCPF(cpf)}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
            required
          />
        </div>

        <div className="input-group">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="( ) __ _____-____"
            maxLength={15}
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            pattern="\(\d{2}\)\s\d{5}-\d{4}"
            title="Digite um telefone válido"
            required
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="********"
            minLength={8}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            title="A senha deve ter no mínimo 8 caracteres, 1 número e 1 caractere especial"
            required
          />
        </div>

        <button type="submit">Cadastrar</button>

        <p className="login-link">
          Já possui uma conta?{" "}
          <span onClick={trocarParaLogin}>Fazer login</span>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;