const { body, validationResult } = require('express-validator');
const Team = require('../models/Team');
const xss = require('xss');

// Função para sanitizar dados de entrada
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return xss(input);
  }
  return input;
};

// Função para listar todos os times
exports.readTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json({ teams, message: 'Times listados com sucesso' });
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

    res.status(200).json({ team, message: 'Time encontrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para criar um time
exports.createTeam = [
  // Validações com express-validator
  body('name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('O nome do time deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('O nome do time só pode conter letras, números e espaços.'),
  body('city')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('A cidade deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('A cidade só pode conter letras e espaços.'),
  body('foundation_date')
    .trim()
    .isDate()
    .withMessage('A data de fundação deve estar no formato aaaa-mm-dd.'),
  body('championships_won')
    .isInt({ min: 0 })
    .withMessage('O número de campeonatos ganhos deve ser um número inteiro positivo.'),
  body('players_count')
    .isInt({ min: 0 })
    .withMessage('O número de jogadores deve ser um número inteiro positivo.'),
  body('coach_name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('O nome do treinador deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('O nome do treinador só pode conter letras e espaços.'),
  body('is_active')
    .isBoolean()
    .withMessage('O campo "está ativo" deve ser true ou false.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, city, foundation_date, championships_won, players_count, coach_name, is_active } = req.body;

      // Sanitiza os dados de entrada
      const sanitizedData = {
        name: sanitizeInput(name),
        city: sanitizeInput(city),
        foundation_date: sanitizeInput(foundation_date),
        championships_won: sanitizeInput(championships_won),
        players_count: sanitizeInput(players_count),
        coach_name: sanitizeInput(coach_name),
        is_active: sanitizeInput(is_active),
      };

      const team = await Team.create(sanitizedData);

      res.status(201).json({ team, message: 'Time criado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Função para atualizar um time
exports.updateTeam = [
  // Validações com express-validator
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('O nome do time deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('O nome do time só pode conter letras, números e espaços.'),
  body('city')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('A cidade deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('A cidade só pode conter letras e espaços.'),
  body('foundation_date')
    .optional()
    .trim()
    .isDate()
    .withMessage('A data de fundação deve estar no formato aaaa-mm-dd.'),
  body('championships_won')
    .optional()
    .isInt({ min: 0 })
    .withMessage('O número de campeonatos ganhos deve ser um número inteiro positivo.'),
  body('players_count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('O número de jogadores deve ser um número inteiro positivo.'),
  body('coach_name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('O nome do treinador deve ter entre 3 e 50 caracteres.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('O nome do treinador só pode conter letras e espaços.'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('O campo "está ativo" deve ser true ou false.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, city, foundation_date, championships_won, players_count, coach_name, is_active } = req.body;

      // Sanitiza os dados de entrada
      const sanitizedData = {
        name: sanitizeInput(name),
        city: sanitizeInput(city),
        foundation_date: sanitizeInput(foundation_date),
        championships_won: sanitizeInput(championships_won),
        players_count: sanitizeInput(players_count),
        coach_name: sanitizeInput(coach_name),
        is_active: sanitizeInput(is_active),
      };

      const team = await Team.findByPk(id);

      if (!team) {
        return res.status(404).json({ message: 'Time não encontrado' });
      }

      await team.update(sanitizedData);

      res.status(200).json({ team, message: 'Time atualizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
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
  },
];