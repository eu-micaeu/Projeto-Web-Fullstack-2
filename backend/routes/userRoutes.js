const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ // Limitar o número de requisições para cada IP

  windowMs: 15 * 60 * 1000, 
  max: 5, 

});

router.get('/users', cachingStrategy, authenticate, userController.getAllUsers, limiter);

router.get('/user/:id', cachingStrategy, authenticate, userController.getUserById, limiter);

router.post('/user', userController.createUser, limiter);

router.put('/user/:id', authenticate, userController.updateUser, limiter);

router.delete('/user/:id', authenticate, userController.deleteUser,limiter);

router.post('/login', userController.loginUser, limiter); // Rota para autenticação do usuário

module.exports = router;