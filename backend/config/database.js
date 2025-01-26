const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário
  process.env.DB_PASS, // Senha
  {
    host: process.env.DB_HOST, // Host
    dialect: 'postgres', // Dialeto
    pool: {
      max: 10, // Número máximo de conexões no pool
      min: 0,  // Número mínimo de conexões no pool
      acquire: 30000, // Tempo máximo (em ms) para tentar obter uma conexão antes de gerar um erro
      idle: 10000, // Tempo máximo (em ms) que uma conexão pode ficar inativa antes de ser liberada
    },
  }
);

module.exports = sequelize;
