const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/createTeam', teamController.createTeam);

router.get('/readTeams', teamController.readTeams);

module.exports = router;