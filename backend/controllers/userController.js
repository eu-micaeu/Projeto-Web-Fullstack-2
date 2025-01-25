const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Configuração do dotenv

// Função para registrar um usuário
exports.registerUser = async (req, res) => {
  
  try {

    const { username, password, role } = req.body;

    const user = await User.create({ username, password, role });

    res.status(201).json({"user":{

      "username": user.username,
      
      "role": user.role

    }, "message": "Usuário criado com sucesso"});

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

// Função para um usuário fazer login
exports.loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ where: { username, password } });

    if (!user) {

      return res.status(401).json({ error: 'Credênciais inválidas' });

    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({

      token,

      message: 'Login efetuado com sucesso',

    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
  
};

