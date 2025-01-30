import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { isAuthTokenValid, removeAuthTokenFromCookies } from '../../utils/cookies';
import Cookies from 'js-cookie';

require('./Header.css');

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = "https://localhost:443";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    const credentials = { username, password };
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Falha ao fazer login");
      }
      const data = await response.json();
      Cookies.set('authToken', data.token, { expires: 1 });
      window.location.reload();
      setOpenLogin(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    const credentials = { username, password };
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Falha ao registrar usuário");
      }

      console.log("Usuário registrado com sucesso");

      // Recarregar a página para atualizar
      window.location.reload();

      // Fechar o diálogo de registro após sucesso
      setOpenRegister(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <header>
      <h1>zoneBask</h1>
      <nav>
        <ul>
          <li>
            {isAuthTokenValid() && (
              <button onClick={() => {
                removeAuthTokenFromCookies();
                window.location.reload();
              }}>
                Logout
              </button>
            )}

            {!isAuthTokenValid() && (
              <button onClick={() => setOpenLogin(true)}>Login</button>
            )}
          </li>
        </ul>
      </nav>

      {/* Pop-Up de Login */}
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        className="login-dialog"
      >
        <div className="dialog-container">
          <h1>Login</h1>
          <h2>Seja bem-vindo ao zoneBask!</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Entrar</button>
          </form>

          <button
            className="switch-button"
            onClick={() => {
              setOpenLogin(false);
              setError('');
              setUsername('');
              setPassword('');
              setOpenRegister(true);
            }}
          >
            Realizar cadastro
          </button>
        </div>
      </Dialog>

      {/* Pop-Up de Register */}
      <Dialog
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        className="register-dialog"
      >
        <div className="dialog-container">
          <h1>Register</h1>
          <h2>Seja bem-vindo ao zoneBask!</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Cadastrar</button>
          </form>

          <button
            className="switch-button"
            onClick={() => {
              setOpenRegister(false);
              setOpenLogin(true);
            }}
          >
            Voltar para login
          </button>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
