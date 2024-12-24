const Car = require('../models/Car');

exports.registerCar = async (req, res) => {

    try {
    
        const { brand, model, year, color } = req.body;
    
        const car = await Car.create({ brand, model, year, color });
    
        res.status(201).json(car);
    
    } catch (error) {
    
        res.status(400).json({ error: error.message });
    
    }
    
};

exports.listCars = async (req, res) => {

    try {
    
        const cars = await Car.findAll();
    
        res.json(cars);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
    
};