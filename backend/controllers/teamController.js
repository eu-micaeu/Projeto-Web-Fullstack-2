const Team = require('../models/Team');

// Função para listar todos os times
exports.readTeams = async (req, res) => {

  try {

    const teams = await Team.findAll();

    res.status(200).json({ teams });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// Função para pesquisar um time pelo nome
exports.readTeamByName = async (req, res) => {

  try {

    const { name } = req.params;

    const team = await Team.findOne({ where: { name } });

    if (!team) {

      return res.status(404).json({ error: 'Time não encontrado' });

    }

    res.status(200).json({ team });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// Função para criar um time
exports.createTeam = [
  
  async (req, res) => {

    try {

      const { name, city, foundation_date, championships_won, players_count, coach_name, is_active } = req.body;

      const team = await Team.create({ name, city, foundation_date, championships_won, players_count, coach_name, is_active });

      res.status(201).json({ team, message: 'Time criado com sucesso' });

    } catch (error) {

      res.status(400).json({ error: error.message });

    }

  }

];

// Função para atualizar um time
exports.updateTeam = [

  async (req, res) => {

    try {

      const { id } = req.params;

      const { name, city, foundation_date, championships_won, players_count, coach_name, is_active } = req.body;

      const team = await Team.findByPk(id);

      if (!team) {

        return res.status(404).json({ message: 'Time não encontrado' });

      }

      await team.update({ name, city, foundation_date, championships_won, players_count, coach_name, is_active });

      res.status(200).json({ team, message: 'Time atualizado com sucesso' });

    } catch (error) {

      res.status(400).json({ error: error.message });

    }

  }

];

// Função para deletar um time
exports.deleteTeam = [

  async (req, res) => {

    try {

      const { id } = req.params;

      const team = await Team.findByPk(id);

      if (!team) {

        return res.status(404).json({ message: 'Time não encontrado' });

      }

      await team.destroy();

      res.status(200).json({ message: 'Time deletado com sucesso' });

    } catch (error) {

      res.status(400).json({ error: error.message });

    }

  }

];