const sequalize = require('../config/database');
const User = require('../models/User');
const Car = require('../models/Car');

exports.install = async (req, res) => {

    try {

        await sequalize.sync({ force: true });

        await User.bulkCreate([

            { username: 'teste', password: 'testesenha123', role: 'admin' },

        ]);

        await Car.bulkCreate([

            { brand: 'Nissan', model: 'Skyline GT-R', year: 1999, color: 'Azul' },
        
            { brand: 'Toyota', model: 'Supra', year: 1998, color: 'Branco' },
        
            { brand: 'Mazda', model: 'RX-7', year: 2002, color: 'Preto' },
        
        ]);        

        res.status(201).json({ message: 'Banco de dados criado!' });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};
