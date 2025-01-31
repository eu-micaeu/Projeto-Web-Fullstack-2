const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const xss = require('xss');

dotenv.config();

// Função para escapar dados de saída
const escapeOutput = (data) => {
  return xss(data);
};

// Função para listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username'], // Não retornar a senha
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para pesquisar um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['user_id', 'username'], // Não retornar a senha
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para registrar um usuário
exports.createUser = [
  // Validações com express-validator
  body('username')
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage('O username deve ter entre 3 e 30 caracteres'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('A senha deve ter pelo menos 8 caracteres'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;

      // Cria o usuário (as validações do Sequelize serão aplicadas aqui)
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });

      res.status(201).json({
        user: {
          user_id: user.user_id,
          username: escapeOutput(user.username), // Escapa o username na resposta
        },
        message: 'Usuário criado com sucesso',
      });
    } catch (error) {
      // Captura erros do Sequelize (por exemplo, username duplicado)
      res.status(400).json({ error: error.message });
    }
  },
];

// Função para atualizar um usuário
exports.updateUser = [
  body('username')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage('O username deve ter entre 3 e 30 caracteres'),
  body('password')
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage('A senha deve ter pelo menos 8 caracteres'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { username, password } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Atualiza os campos fornecidos
      if (username) user.username = username;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();

      res.status(200).json({
        user: {
          user_id: user.user_id,
          username: escapeOutput(user.username), // Escapa o username na resposta
        },
        message: 'Usuário atualizado com sucesso',
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Função para deletar um usuário
exports.deleteUser = [
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();

      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

// Função para um usuário fazer login
exports.loginUser = [

  async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        token,
        message: 'Login efetuado com sucesso',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];