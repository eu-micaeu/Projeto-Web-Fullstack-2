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

    unique: { msg: 'Nome de usuário já cadastrado.' },

    validate: {

      notEmpty: { msg: 'O campo nome de usuário não pode ser vazio.' },

      is: {

        args: /^[a-zA-Z0-9_]+$/, 

        msg: 'O nome de usuário só pode conter letras, números e underscores.'

      },

      isLength: {

        args: [5], 

        msg: 'O nome deve ter mais de 5 caracteres.'

      },

    }

  },

  password: { // Coluna de senha

    type: DataTypes.STRING,

    allowNull: false,

    validate: {

      notEmpty: { msg: 'O campo senha de usuário não pode ser vazio.' },

      is: {

        args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{8,}$/,

        msg: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.'

      },

      isLength: {

        args: [8],

        msg: 'A senha deve ter mais de 8 caracteres.'

      },

    }

  },

}, {

  sequelize, // Conexão com o banco de dados

  modelName: 'User', // Nome do modelo

  timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = User;
