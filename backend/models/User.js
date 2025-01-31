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

// Função para registrar um usuário
exports.registerUser = [
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