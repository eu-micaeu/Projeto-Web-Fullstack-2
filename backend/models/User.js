const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
class User extends Model { }

// Modelo de usuário
User.init(
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
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

    password: {
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

  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false
  }
);

module.exports = User;