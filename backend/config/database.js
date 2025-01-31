const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
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
    },
  }
);

module.exports = sequelize;
