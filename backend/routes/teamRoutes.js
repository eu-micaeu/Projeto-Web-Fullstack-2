const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/createTeam', authenticate, teamController.createTeam);

router.get('/readTeams' , teamController.readTeams);

router.get('/readTeamByName/:name', authenticate, teamController.readTeamByName);

module.exports = router;