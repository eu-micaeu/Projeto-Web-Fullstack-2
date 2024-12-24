const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Configuração do dotenv

exports.registerUser = async (req, res) => {
  
  try {

    const { username, password } = req.body;

    const user = await User.create({ username, password, role });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

exports.loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ where: { username, password } });

    if (!user) {

      return res.status(401).json({ error: 'Credênciais inválidas' });

    }

    const token = jwt.sign({ user_id: user.user_id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ "user": {

      "username": user.username,

      "role": user.role

    }, "token": token });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.updateUser = async (req, res) => {

  const { id } = req.params;

  const { username, password } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });

    }

    if (id != req.user.user_id) {

      if (req.user.role != 'admin'){

        return res.status(401).json({ error: 'Não autorizado' });

      }

    }

    if (username) user.username = username;

    if (password) user.password = password;

    await user.save();

    res.json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });

    }

    console.log(req.user.user_id);

    console.log(id);

    if (id != req.user.user_id) {

      if (req.user.role != 'admin'){

        return res.status(401).json({ error: 'Não autorizado' });

      }

    }

    await user.destroy();

    res.json({ message: 'Usuário deletado' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.createAdmin = async (req, res) => {

  try {

    if (req.user.role !== 'admin') {

      return res.status(401).json({ error: 'Não autorizado' });

    }

    const { username, password } = req.body;

    const user = await User.create({ username, password, role: 'admin' });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

exports.deleteUserbyAdmin = async (req, res) => {

  const { id } = req.params;

  try {

    if (req.user.role !== 'admin') {

      return res.status(401).json({ error: 'Não autorizado' });

    }
    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });
      
    }

    Address.destroy({ where: { user_id: id } });

    Product.destroy({ where: { user_id: id } });

    await user.destroy();

    res.json({ message: 'Usuário deletado' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};