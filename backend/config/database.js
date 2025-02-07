const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Certifique-se de que isso está conforme o provedor exige
      },
    },
    pool: {
      max: 10,
      min: 0,
    },
  }
);


module.exports = sequelize;
