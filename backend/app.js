const express = require('express');
const https = require('https'); // Importa o módulo HTTPS
const fs = require('fs'); // Importa o módulo de sistema de arquivos
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan'); // Importa o morgan para monitoramento

dotenv.config(); // Carrega variáveis de ambiente

const app = express(); // Inicializa o servidor

app.use(morgan('combined')); // Adiciona o morgan para monitoramento

app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
})); // Permite requisições de outros domínios

app.use(express.json()); // Permite o uso de JSON nas requisições

app.use(compression()); // Habilita a compressão de arquivos estáticos e respostas HTTP

app.use('/api/users', userRoutes); // Rota para usuários

app.use('/api/teams', teamRoutes); // Rota para times

const sslOptions = {
    key: fs.readFileSync('./ssl/localhost.key'), // Caminho para o arquivo da chave privada
    cert: fs.readFileSync('./ssl/localhost.crt'), // Caminho para o arquivo do certificado
};

const PORT = process.env.PORT;

// Inicializa o servidor HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor rodando com SSL na porta ${PORT}`);
});