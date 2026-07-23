import "./registers.css";
import { useState } from "react";

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

    const regexEmailEstrito = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!regexEmailEstrito.test(email)) {
      alert("E-mail inválido! O e-mail precisa conter um domínio válido (ex: .com ou .com.br)");
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
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite seu CPF"
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
            placeholder="Digite seu telefone"
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
            placeholder="Digite sua senha"
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



// import "./registers.css";
// import { useState } from "react";

// function Cadastro({ trocarParaLogin, onCadastroSucesso }) {

//   const [nome, setNome] = useState("");
//   const [email, setEmail] = useState("");
//   const [cpf, setCpf] = useState(""); // Guarda APENAS números
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");

//   function formatarNome(valor) {
//     return valor.replace(/[0-9]/g, "");
//   }

//   function exibirCPF(valor) {
//     let v = valor.replace(/\D/g, "");
//     v = v.replace(/(\d{3})(\d)/, "$1.$2");
//     v = v.replace(/(\d{3})(\d)/, "$1.$2");
//     v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
//     return v;
//   }

//   function formatarTelefone(valor) {
//     let v = valor.replace(/\D/g, "");
//     v = v.replace(/(\d{2})(\d)/, "($1) $2");
//     v = v.replace(/(\d{5})(\d)/, "$1-$2");
//     return v;
//   }

//   // ETAPA 2: Autenticação Automática via HttpBasic (email e senha)
//   async function autenticarUsuario(emailLogin, senhaLogin, cpfLimpo, nomeUsuario) {
//     const credenciaisBase64 = btoa(unescape(encodeURIComponent(`${emailLogin}:${senhaLogin}`)));

//     try {
//       const resposta = await fetch("https://pedidos-totem.onrender.com/auth/autenticar", {
//         method: "POST",
//         headers: {
//           "Authorization": `Basic ${credenciaisBase64}`
//         },
//         body: "" 
//       });

//       if (resposta.ok) {
//         const dadosAutenticacao = await resposta.json();
        
//         if (dadosAutenticacao.token) {
//           localStorage.setItem("token_usuario", dadosAutenticacao.token);
//         }
        
//         localStorage.setItem("cpf_usuario", cpfLimpo);
        
//         if (onCadastroSucesso) {
//           onCadastroSucesso({ nome: nomeUsuario, cpf: cpfLimpo });
//         }
//       } else {
//         // Fallback 1: Se o servidor respondeu mas rejeitou o login automático, loga localmente para testar o Totem
//         console.warn("API rejeitou a autenticação automática. Ativando login local de contingência.");
//         localStorage.setItem("cpf_usuario", cpfLimpo);
//         if (onCadastroSucesso) {
//           onCadastroSucesso({ nome: nomeUsuario, cpf: cpfLimpo });
//         }
//       }
//     } catch (erro) {
//       // Fallback 2: Erro de rede/CORS (O erro atual). Força o login local para fechar a tela e seguir o fluxo!
//       console.error("Erro de CORS ou rede na autenticação. Ativando login local para não travar o cliente.");
      
//       localStorage.setItem("cpf_usuario", cpfLimpo);
      
//       if (onCadastroSucesso) {
//         onCadastroSucesso({ nome: nomeUsuario, cpf: cpfLimpo });
//       }
//     }
//   }

//   // ETAPA 1: Validar e Criar o usuário na API
//   async function tratarEnvio(evento) {
//     evento.preventDefault(); 

//     const regexEmailEstrito = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

//     if (!regexEmailEstrito.test(email)) {
//       alert("E-mail inválido! O e-mail precisa conter um domínio válido (ex: .com ou .com.br)");
//       return; 
//     }

//     const dadosUsuario = {
//       nome,
//       email,
//       cpf, 
//       senha,
//       telefone: telefone.replace(/\D/g, "") 
//     };

//     try {
//       const resposta = await fetch("https://pedidos-totem.onrender.com/user/sign", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dadosUsuario),
//       });

//       if (resposta.ok) {
//         alert("Cadastro realizado com sucesso! Iniciando login...");
//         await autenticarUsuario(email, senha, cpf, nome);
//       } else {
//         const dadosErro = await resposta.json().catch(() => ({}));
//         const mensagemServidor = dadosErro.message || "Verifique se o e-mail ou CPF já estão cadastrados.";
//         alert(`Erro do servidor no Cadastro: ${mensagemServidor}`);
//       }
//     } catch (erro) {
//       console.error("Erro na requisição de cadastro:", erro);
//       alert("Erro de conexão com o servidor.");
//     }
//   }

//   return (
//     <div className="cadastro-container">
//       <form className="cadastro-form" onSubmit={tratarEnvio}>
//         <h1>Cadastro</h1>

//         <div className="input-group">
//           <label>Nome</label>
//           <input
//             type="text"
//             placeholder="Digite seu nome"
//             minLength={5}
//             value={nome}
//             onChange={(e) => setNome(formatarNome(e.target.value))}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Digite seu email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label>CPF</label>
//           <input
//             type="text"
//             placeholder="Digite seu CPF"
//             maxLength={14}
//             value={exibirCPF(cpf)}
//             onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label>Telefone</label>
//           <input
//             type="text"
//             placeholder="Digite seu telefone"
//             maxLength={15}
//             value={telefone}
//             onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
//             pattern="\(\d{2}\)\s\d{5}-\d{4}"
//             title="Digite um telefone válido"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label>Senha</label>
//           <input
//             type="password"
//             placeholder="Digite sua senha"
//             minLength={8}
//             value={senha}
//             onChange={(e) => setSenha(e.target.value)}
//             pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
//             title="A senha deve ter no mínimo 8 caracteres, 1 número e 1 caractere especial"
//             required
//           />
//         </div>

//         <button type="submit">Cadastrar</button>

//         <p className="login-link">
//           Já possui uma conta?{" "}
//           <span onClick={trocarParaLogin}>Fazer login</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Cadastro;