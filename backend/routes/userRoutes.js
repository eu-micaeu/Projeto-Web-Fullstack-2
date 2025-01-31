const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy'); 

router.get('/users', cachingStrategy, authenticate, userController.getAllUsers);

router.get('/user/:id', cachingStrategy, authenticate, userController.getUserById);

router.post('/user', userController.createUser);

router.put('/user/:id', authenticate, userController.updateUser);

router.delete('/user/:id', authenticate, userController.deleteUser);

router.post('/login', userController.loginUser); // Rota para autenticação do usuário

module.exports = router;