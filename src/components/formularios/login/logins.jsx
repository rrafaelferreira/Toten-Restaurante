import "./logins.css";
import { useState } from "react";

function Login({ trocarParaCadastro }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="login-container">

      <form className="login-form">

        <h1>Login</h1>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Digite um email válido"
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

        <span className="forgot-password">
          Esqueci a senha
        </span>

        <button type="submit">
          Entrar
        </button>

        <p className="login-link">
          Não possui uma conta?{" "}

          <span onClick={trocarParaCadastro}>
            Cadastre-se
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;