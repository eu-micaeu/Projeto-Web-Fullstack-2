const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/createTeam', authenticate, teamController.createTeam); // Rotas para criar um time

router.get('/readTeams' , teamController.readTeams); // Rota para ler todos os times

router.get('/readTeamByName/:name', authenticate, teamController.readTeamByName); // Rota para ler um time pelo nome

module.exports = router;