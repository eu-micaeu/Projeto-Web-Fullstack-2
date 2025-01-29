const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cachingStrategy = require('../middlewares/cachingStrategy'); 

router.get('/readTeams', cachingStrategy, teamController.readTeams);

router.get('/readTeamByName/:name', authenticate, cachingStrategy, teamController.readTeamByName);

router.post('/createTeam', authenticate, teamController.createTeam);

router.put('/updateTeam/:id', authenticate, teamController.updateTeam);

router.delete('/deleteTeam/:id', authenticate, teamController.deleteTeam);

module.exports = router;
