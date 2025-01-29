const Team = require('../models/Team');

const { check, validationResult } = require('express-validator');

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

  check('name')

    .isAlphanumeric().withMessage('Nome de time inválido.'),

  check('city')

    .isAlphanumeric().withMessage('Nome da cidade inválido.'),

  check('foundation_date')

    .isDate({ format: 'YYYY-MM-DD' }).withMessage('A data de fundação deve ser uma data válida no formato YYYY-MM-DD.'),

  check('championships_won')

    .isInt().withMessage('O número de compeonatos vencidos deve ser um número inteiro.'),

  check('players_count')

    .isInt().withMessage('O número de jogadores deve ser um número inteiro.'),

  check('coach_name')

    .isAlphanumeric().withMessage('O nome do treinador inválido.'),

  check('is_active')

    .isBoolean().withMessage('O campo "is_active" deve ser um valor booleano (true ou false).'),
  
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

// Função para deletar um time
exports.deleteTeam = [

  check('id')

    .isInt().withMessage('ID inválido')

    .notEmpty().withMessage('O ID é obrigatório'),

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

// Função para atualizar um time
exports.updateTeam = [

  check('id')

    .isInt().withMessage('ID inválido')

    .notEmpty().withMessage('O ID é obrigatório'),

  check('name')

    .isAlphanumeric().withMessage('Nome do time inválido')

    .notEmpty().withMessage('O nome do time é obrigatório'),

  check('city')

    .isAlphanumeric().withMessage('Nome da cidade inválido')

    .notEmpty().withMessage('O nome da cidade é obrigatório'),

  check('foundation_date')

    .isDate().withMessage('Data de fundação inválida')

    .notEmpty().withMessage('A data de fundação é obrigatória'),

  check('championships_won')

    .isInt().withMessage('Número de títulos inválido')

    .notEmpty().withMessage('O número de títulos é obrigatório'),

  check('players_count')

    .isInt().withMessage('Número de jogadores inválido')

    .notEmpty().withMessage('O número de jogadores é obrigatório'),

  check('coach_name')

    .isAlphanumeric().withMessage('Nome do técnico inválido')

    .notEmpty().withMessage('O nome do técnico é obrigatório'),

  check('is_active')

    .isBoolean().withMessage('Valor inválido')

    .notEmpty().withMessage('O status do time é obrigatório'),

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
