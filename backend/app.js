const express = require('express');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const installRoutes = require('./routes/installRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express(); // Inicializa o servidor

app.use(cors()); // Permite o uso de CORS

app.use(express.json()); // Permite o uso de JSON nas requisições

app.use('/api/users', userRoutes); // Rota para usuários

app.use('/api/teams', teamRoutes); // Rota para times

app.use('/api', installRoutes); // Rota para instalação

const PORT = process.env.PORT; // Porta do servidor

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor
