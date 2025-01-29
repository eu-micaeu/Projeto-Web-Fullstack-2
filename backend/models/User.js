const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }

// Modelo de usuário
User.init({

    user_id: { // Coluna de ID

      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,

    },

    username: { // Coluna de nome de usuário

      type: DataTypes.STRING,

      allowNull: false,
      unique: {
        msg: 'Já existe um username com esse nome.' 
      },
      validate: {
        notEmpty: { msg: 'O nome do username é obrigatório.' },
      }

    },

    password: { // Coluna de senha

      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        notEmpty: { msg: 'A senha é obrigatória.' },
        len: {
          args: [8], 
          msg: 'A senha deve ter pelo menos 8 caracteres.'
        }
      }

    },

}, {

    sequelize, // Conexão com o banco de dados
  
    modelName: 'User', // Nome do modelo
  
    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = User;
