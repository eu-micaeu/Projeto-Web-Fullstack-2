const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

class Team extends Model { }

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

      allowNull: false,

      unique: {

        msg: 'Já existe um time com esse nome.'

      },

    },

    city: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    foundation_date: {

      type: DataTypes.DATEONLY,

      allowNull: false,

    },

    championships_won: {

      type: DataTypes.INTEGER,

      allowNull: false,

      defaultValue: 0,

    },

    players_count: {

      type: DataTypes.INTEGER,

      allowNull: false,

      defaultValue: 0,

    },

    coach_name: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    is_active: {

      type: DataTypes.BOOLEAN,

      allowNull: false,

    },

  },

  {

    sequelize,

    modelName: 'Team',

    timestamps: false,

  }

);

module.exports = Team;
