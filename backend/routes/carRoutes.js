const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/registerCar', authenticate, carController.registerCar);

router.get('/listCars', carController.listCars);

module.exports = router;