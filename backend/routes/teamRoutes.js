const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy'); 

router.post('/createTeam', authenticate, teamController.createTeam);

router.get('/readTeams', cachingStrategy, teamController.readTeams);

router.get('/readTeamByName/:name', authenticate, cachingStrategy, teamController.readTeamByName);

module.exports = router;
