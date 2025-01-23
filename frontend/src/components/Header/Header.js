import './Header.css';
import { Dialog } from '@mui/material';
import { useState } from 'react';

function Header() {

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

            <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>

                <h1>Login</h1>

                <h2>Seja bem-vindo ao zoneBask!</h2>

                <form>

                    <label htmlFor="username">Nome de usuário:</label>

                    <input type="text" id="username" name="username" />

                    <label htmlFor="password">Senha:</label>

                    <input type="password" id="password" name="password" />

                </form>

                <button onClick={() => {
                    setOpenLogin(false);
                    setOpenRegister(true);
                }}>Realizar cadastro</button>

            </Dialog>

            {/* Pop-Up de Register */}
            <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>

                <h1>Register</h1>

                <h2>Seja bem-vindo ao zoneBask!</h2>

                <form>

                    <label htmlFor="username">Nome de usuário:</label>

                    <input type="text" id="username" name="username" />

                    <label htmlFor="password">Senha:</label>

                    <input type="password" id="password" name="password" />

                </form>

                <button onClick={() => {
                    setOpenRegister(false);
                    setOpenLogin(true);
                }}>Voltar para login</button>

            </Dialog>

        </header>

    )

}

export default Header;