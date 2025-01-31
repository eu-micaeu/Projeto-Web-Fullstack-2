const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy');
const rateLimit = require('express-rate-limit');

// Função para limitar o número de requisições para cada IP
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 5, 
});

router.get('/readTeams', cachingStrategy, teamController.readTeams, limiter);
router.get('/readTeamByName/:name', authenticate, cachingStrategy, teamController.readTeamByName, limiter);
router.post('/createTeam', authenticate, teamController.createTeam, limiter);
router.put('/updateTeam/:id', authenticate, teamController.updateTeam, limiter);
router.delete('/deleteTeam/:id', authenticate, teamController.deleteTeam, limiter);
module.exports = router;
