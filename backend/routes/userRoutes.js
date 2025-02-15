const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy');
const rateLimit = require('express-rate-limit');

// Função para limitar o número de requisições para cada IP
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 5, 
});

router.use(limiter);

router.get('/', cachingStrategy, authenticate, userController.getAllUsers);
router.get('/:id', cachingStrategy, authenticate, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;