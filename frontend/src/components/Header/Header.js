import React, { useState } from "react";
import "./Header.css";
import { Dialog } from "@mui/material"; // Certifique-se de instalar o MUI

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <header>
      <h1>zoneBask</h1>

      <nav>
        <ul>
          <li>
            <button onClick={() => setOpenLogin(true)}>Login</button>
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
          <form>
            <label htmlFor="username">Nome de usuário:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />

            <button type="submit">Entrar</button>
          </form>

          <button
            className="switch-button"
            onClick={() => {
              setOpenLogin(false);
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
          <form>
            <label htmlFor="username">Nome de usuário:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />

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
