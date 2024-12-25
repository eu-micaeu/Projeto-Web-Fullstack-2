const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Team extends Model { }

// Modelo de Time
Team.init({

    team_id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    name: { // Coluna de nome

        type: DataTypes.STRING,

        allowNull: false,

        unique: true,

    },

    city: { // Coluna de cidade

        type: DataTypes.STRING,

        allowNull: false,

    },

    foundation_date: { // Coluna de data de fundação

        type: DataTypes.DATEONLY,

        allowNull: true,

    },

    championships_won: { // Coluna de campeonatos ganhos

        type: DataTypes.INTEGER,

        defaultValue: 0,

    },

    players_count: { // Coluna de quantidade de jogadores

        type: DataTypes.INTEGER,

        defaultValue: 0,

    },

    coach_name: { // Coluna de nome do técnico

        type: DataTypes.STRING,

        allowNull: true,

    },

    is_active: { // Coluna de time ativo

        type: DataTypes.BOOLEAN,

        defaultValue: true,

    },

}, {

    sequelize,

    modelName: 'Team',

    timestamps: false
    
});

module.exports = Team;
