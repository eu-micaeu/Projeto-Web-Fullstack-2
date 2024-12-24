const sequalize = require('../config/database');
const User = require('../models/User');

exports.install = async (req, res) => {

    try {

        await sequalize.sync({ force: true });

        await User.bulkCreate([
            { username: 'joaoRefrigeracao', password: 'frioGelado123', role: 'user' },
            { username: 'mariaLavagem', password: 'limpezaTotal', role: 'user' },
            { username: 'carlosCozinha', password: 'chefDeCasa', role: 'user' },
            { username: 'anaTvSom', password: 'cinemaEmCasa', role: 'user' },
            { username: 'pedroEletro', password: 'energiaTotal', role: 'user' }
        ]);

        res.status(201).json({ message: 'Banco de dados criado e usuário administrador inserido!' });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};
