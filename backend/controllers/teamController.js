const Team = require('../models/Team');

// Função para criar um time
exports.createTeam = async (req, res) => {

  try {

    const { name, description } = req.body;

    const team = await Team.create({ name, description });

    res.status(201).json({ team, message: 'Time criado com sucesso' });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

// Função para listar todos os times
exports.readTeams = async (req, res) => {

  try {

    const teams = await Team.findAll();

    res.status(200).json({ teams });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};