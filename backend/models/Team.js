const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
class Team extends Model { }

// Modelo de time
Team.init(
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Já existe um time com esse nome.' },
      validate: {
        notEmpty: { msg: 'O campo nome não pode ser vazio.' },
        is: {
          args: /^[a-zA-Z0-9\s]+$/,
          msg: 'O campo nome só pode conter letras, espaços e números.'
        }
      }
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O campo cidade não pode ser vazio.' },
        is: {
          args: /^[a-zA-Z\s]+$/,
          msg: 'O campo cidade só pode conter letras e espaços.'
        }
      }
    },

    foundation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O campo data de fundação não pode ser vazio.' },
        is: {
          args: /^(\d{4})-(\d{2})-(\d{2})$/,
          msg: 'A data de fundação deve estar no formato aaaa/mm/dd.'
        }
      }
    },

    championships_won: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'O campo campeonatos ganhos não pode ser vazio.' },
        is: {
          args: /^[0-9]+$/,
          msg: 'O campo campeonatos ganhos só pode conter números.'
        }
      }
    },

    players_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'O campo quantidade de jogadores não pode ser vazio.' },
        is: {
          args: /^[0-9]+$/,
          msg: 'O campo quantidade de jogadores só pode conter números.'
        }
      }
    },

    coach_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O campo treinador não pode ser vazio.' },
        is: {
          args: /^[a-zA-Z\s]+$/,
          msg: 'O campo treinador só pode conter letras e espaços.'
        }
      },
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O campo está ativo não pode ser vazio.' },
        is: {
          args: /^(true|false)$/,
          msg: 'O campo está ativo só pode ser true ou false.'
        }
      },
    },

  },
  {
    sequelize,
    modelName: 'teams',
    timestamps: false,
  }
);

module.exports = Team;