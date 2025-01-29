const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy'); 

// 🔹 Criar time (sem cache, pois é uma operação de escrita)
router.post('/createTeam', authenticate, teamController.createTeam);

// 🔹 Ler todos os times (com cache para melhorar a performance)
router.get('/readTeams', cachingStrategy, teamController.readTeams);

// 🔹 Ler um time pelo nome (com cache, pois é uma consulta frequente)
router.get('/readTeamByName/:name', authenticate, cachingStrategy, teamController.readTeamByName);

module.exports = router;
