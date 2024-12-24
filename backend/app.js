const express = require('express');
const userRoutes = require('./routes/userRoutes');
const installRoutes = require('./routes/installRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // Inicializa o servidor

app.use(express.json()); // Permite o uso de JSON nas requisições

app.use('/api/users', userRoutes); // Rota para usuários

app.use('/api', installRoutes); // Rota para instalação

const PORT = process.env.PORT; // Porta do servidor

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor
