const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser); // Rota para registrar um usuário 

router.post('/login', userController.loginUser); // Rota para um usuário fazer login

module.exports = router;