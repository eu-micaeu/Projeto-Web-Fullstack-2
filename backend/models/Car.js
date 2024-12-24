const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Car extends Model { }

// Modelo de usuário
Car.init({

    car_id: { // Coluna de ID

      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,

    },

    brand: { // Coluna de marca

      type: DataTypes.STRING,

      allowNull: false,

    },

    model: { // Coluna de modelo

      type: DataTypes.STRING,

      allowNull: false,

    },

    year: { // Coluna de ano

      type: DataTypes.INTEGER,

      allowNull: false,

    },

    color: { // Coluna de cor

      type: DataTypes.STRING,

      allowNull: false,

    },

}, {

    sequelize, // Conexão com o banco de dados
  
    modelName: 'Car', // Nome do modelo
  
    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Car;
