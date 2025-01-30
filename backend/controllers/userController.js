const User = require('../models/User');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const bcrypt = require('bcryptjs');

dotenv.config();

// Função para registrar um usuário
exports.registerUser = [

  async (req, res) => {

    try {
      
      const { username, password } = req.body;

      console.log(username, password);

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log(hashedPassword);

      const user = await User.create({ username, password: hashedPassword });

      res.status(201).json({

        user: {

          username: user.username,

        },

        message: 'Usuário criado com sucesso',

      });

    } catch (error) {

      res.status(400).json({ error: error.message });

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

  }

];
