const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Team extends Model {}

// Modelo de Time
Team.init(
  {
    team_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Campo obrigatório
        unique: {
          msg: 'Já existe um time com esse nome.' // Mensagem de erro para nome duplicado
        },
        validate: {
          notEmpty: { msg: 'O nome do time é obrigatório.' },
        }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O nome da cidade é obrigatório.' },
      }
    },
    foundation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'A data de fundação é obrigatória.' },
        isDate: { msg: 'A data de fundação deve ser uma data válida.' },
      }
    },
    championships_won: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'O número de campeonatos vencidos deve ser um número inteiro.' },
        min: { args: [1], msg: 'O número de campeonatos vencidos não pode ser negativo.' },
      },
    },
    players_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'O número de jogadores deve ser um número inteiro.' },
        min: { args: [1], msg: 'O número de jogadores não pode ser negativo.' },
      },
    },
    coach_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: { msg: 'O nome do treinador é obrigatório.' },
        },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'A atividade deve ser um valor booleano (true ou false).'},
        },
    },
  },
  {
    sequelize,
    modelName: 'Team',
    timestamps: false, 
  }
);

module.exports = Team;
