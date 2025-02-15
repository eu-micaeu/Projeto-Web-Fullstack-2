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

router.use(limiter); 

router.get('/', cachingStrategy, teamController.readTeams);
router.get('/:name', authenticate, cachingStrategy, teamController.readTeamByName);
router.post('/', authenticate, teamController.createTeam);
router.put('/:id', authenticate, teamController.updateTeam);
router.delete('/:id', authenticate, teamController.deleteTeam);

module.exports = router;