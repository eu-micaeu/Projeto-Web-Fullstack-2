const sequalize = require('../config/database');
const User = require('../models/User');
const Team = require('../models/Team');

exports.install = async (req, res) => {

    try {

        await sequalize.sync({ force: true });

        await User.bulkCreate([

            { username: 'teste', password: 'testesenha123', role: 'admin' },

        ]);

        await Team.bulkCreate([
            {
              name: 'Los Angeles Lakers',
              city: 'Los Angeles',
              foundation_date: '1947-11-01',
              championships_won: 17,
              players_count: 15,
              coach_name: 'Darvin Ham',
              is_active: true
            },
            {
              name: 'Golden State Warriors',
              city: 'San Francisco',
              foundation_date: '1946-01-01',
              championships_won: 7,
              players_count: 15,
              coach_name: 'Steve Kerr',
              is_active: true
            },
          ]);          
            
        res.status(201).json({ message: 'Banco de dados criado!' });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};
