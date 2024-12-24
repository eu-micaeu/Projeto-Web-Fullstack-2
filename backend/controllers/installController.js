const sequalize = require('../config/database');
const User = require('../models/User');

exports.install = async (req, res) => {

    try {

        await sequalize.sync({ force: true });

        await User.bulkCreate([

            { username: 'teste', password: 'testesenha123', role: 'admin' },

        ]);

        res.status(201).json({ message: 'Banco de dados criado!' });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};
