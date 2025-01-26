const sequalize = require('../config/database');
const Team = require('../models/Team');

exports.install = async (req, res) => {

  try {

    await sequalize.sync({ force: true });

    await Team.bulkCreate([
      // Times da NBA
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
      {
        name: 'Miami Heat',
        city: 'Miami',
        foundation_date: '1988-04-05',
        championships_won: 3,
        players_count: 15,
        coach_name: 'Erik Spoelstra',
        is_active: true
      },
      {
        name: 'Boston Celtics',
        city: 'Boston',
        foundation_date: '1946-06-06',
        championships_won: 17,
        players_count: 15,
        coach_name: 'Joe Mazzulla',
        is_active: true
      },
      {
        name: 'Chicago Bulls',
        city: 'Chicago',
        foundation_date: '1966-01-16',
        championships_won: 6,
        players_count: 15,
        coach_name: 'Billy Donovan',
        is_active: true
      },
      {
        name: 'Brooklyn Nets',
        city: 'Brooklyn',
        foundation_date: '1967-01-01',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Jacque Vaughn',
        is_active: true
      },
      {
        name: 'Philadelphia 76ers',
        city: 'Philadelphia',
        foundation_date: '1946-12-22',
        championships_won: 3,
        players_count: 15,
        coach_name: 'Nick Nurse',
        is_active: true
      },
      {
        name: 'Houston Rockets',
        city: 'Houston',
        foundation_date: '1967-05-11',
        championships_won: 2,
        players_count: 15,
        coach_name: 'Ime Udoka',
        is_active: true
      },
      {
        name: 'Dallas Mavericks',
        city: 'Dallas',
        foundation_date: '1980-06-13',
        championships_won: 1,
        players_count: 15,
        coach_name: 'Jason Kidd',
        is_active: true
      },
      {
        name: 'Phoenix Suns',
        city: 'Phoenix',
        foundation_date: '1968-01-28',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Frank Vogel',
        is_active: true
      },
      {
        name: 'Toronto Raptors',
        city: 'Toronto',
        foundation_date: '1995-06-07',
        championships_won: 1,
        players_count: 15,
        coach_name: 'Darko Rajakovic',
        is_active: true
      },
      {
        name: 'Indiana Pacers',
        city: 'Indianapolis',
        foundation_date: '1967-01-01',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Rick Carlisle',
        is_active: true
      },
      {
        name: 'Memphis Grizzlies',
        city: 'Memphis',
        foundation_date: '1995-06-06',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Taylor Jenkins',
        is_active: true
      },
      {
        name: 'Sacramento Kings',
        city: 'Sacramento',
        foundation_date: '1945-04-09',
        championships_won: 1,
        players_count: 15,
        coach_name: 'Mike Brown',
        is_active: true
      },
      {
        name: 'Detroit Pistons',
        city: 'Detroit',
        foundation_date: '1941-08-01',
        championships_won: 3,
        players_count: 15,
        coach_name: 'Monty Williams',
        is_active: true
      },
      {
        name: 'Atlanta Hawks',
        city: 'Atlanta',
        foundation_date: '1946-01-01',
        championships_won: 1,
        players_count: 15,
        coach_name: 'Quin Snyder',
        is_active: true
      },
      {
        name: 'Charlotte Hornets',
        city: 'Charlotte',
        foundation_date: '1988-05-11',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Steve Clifford',
        is_active: true
      },
      {
        name: 'Minnesota Timberwolves',
        city: 'Minneapolis',
        foundation_date: '1989-01-28',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Chris Finch',
        is_active: true
      },
      {
        name: 'Oklahoma City Thunder',
        city: 'Oklahoma City',
        foundation_date: '1967-01-01',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Mark Daigneault',
        is_active: true
      },
      {
        name: 'Orlando Magic',
        city: 'Orlando',
        foundation_date: '1989-04-04',
        championships_won: 0,
        players_count: 15,
        coach_name: 'Jamahl Mosley',
        is_active: true
      },
      {
        name: 'Washington Wizards',
        city: 'Washington',
        foundation_date: '1961-01-01',
        championships_won: 1,
        players_count: 15,
        coach_name: 'Wes Unseld Jr.',
        is_active: true
      },
      // Times do Brasil
      {
        name: 'Flamengo',
        city: 'Rio de Janeiro',
        foundation_date: '1927-03-19',
        championships_won: 6,
        players_count: 12,
        coach_name: 'José Neto',
        is_active: true
      },
      {
        name: 'São Paulo FC',
        city: 'São Paulo',
        foundation_date: '1929-12-02',
        championships_won: 0,
        players_count: 12,
        coach_name: 'Cláudio Mortari',
        is_active: true
      },
      {
        name: 'Franca Basquete',
        city: 'Franca',
        foundation_date: '1950-08-02',
        championships_won: 12,
        players_count: 12,
        coach_name: 'Helinho',
        is_active: true
      },
      {
        name: 'Bauru Basket',
        city: 'Bauru',
        foundation_date: '2006-10-11',
        championships_won: 0,
        players_count: 12,
        coach_name: 'Demétrius Ferracciú',
        is_active: true
      },
      {
        name: 'Minas Tênis Clube',
        city: 'Belo Horizonte',
        foundation_date: '1935-10-11',
        championships_won: 0,
        players_count: 12,
        coach_name: 'Léo Costa',
        is_active: true
      },
      // Times do Japão
      {
        name: 'Alvark Tokyo',
        city: 'Tóquio',
        foundation_date: '2000-01-01',
        championships_won: 2,
        players_count: 12,
        coach_name: 'Zeljko Obradovic',
        is_active: true
      },
      {
        name: 'Chiba Jets',
        city: 'Chiba',
        foundation_date: '2005-03-01',
        championships_won: 1,
        players_count: 12,
        coach_name: 'Aaron Bruce',
        is_active: true
      },
      {
        name: 'Akita Northern Happinets',
        city: 'Akita',
        foundation_date: '2005-12-01',
        championships_won: 0,
        players_count: 12,
        coach_name: 'David Benoit',
        is_active: true
      },
      {
        name: 'Utsunomiya Brex',
        city: 'Utsunomiya',
        foundation_date: '2000-01-01',
        championships_won: 1,
        players_count: 12,
        coach_name: 'Tomohiro Sato',
        is_active: true
      },
      {
        name: 'Tamagawa Gakuen Big Blue',
        city: 'Tamagawa',
        foundation_date: '1997-09-01',
        championships_won: 0,
        players_count: 12,
        coach_name: 'Kiyohiko Noguchi',
        is_active: true
      },
      // Times da Espanha
      {
        name: 'Real Madrid',
        city: 'Madrid',
        foundation_date: '1931-12-19',
        championships_won: 35,
        players_count: 12,
        coach_name: 'Pablo Laso',
        is_active: true
      },
      {
        name: 'FC Barcelona',
        city: 'Barcelona',
        foundation_date: '1926-08-24',
        championships_won: 2,
        players_count: 12,
        coach_name: 'Sarunas Jasikevicius',
        is_active: true
      },
      {
        name: 'Baskonia',
        city: 'Vitoria-Gasteiz',
        foundation_date: '1959-03-01',
        championships_won: 3,
        players_count: 12,
        coach_name: 'Dusko Ivanovic',
        is_active: true
      },
      {
        name: 'Valencia Basket',
        city: 'Valência',
        foundation_date: '1986-01-01',
        championships_won: 1,
        players_count: 12,
        coach_name: 'Jaume Ponsarnau',
        is_active: true
      },
      {
        name: 'Unicaja Málaga',
        city: 'Málaga',
        foundation_date: '1992-07-01',
        championships_won: 1,
        players_count: 12,
        coach_name: 'Ibon Navarro',
        is_active: true
      },
      // Times da China
      {
        name: 'Guangdong Southern Tigers',
        city: 'Guangdong',
        foundation_date: '1993-01-01',
        championships_won: 11,
        players_count: 12,
        coach_name: 'Du Feng',
        is_active: true
      },
      {
        name: 'Liaoning Flying Leopards',
        city: 'Liaoning',
        foundation_date: '1995-01-01',
        championships_won: 2,
        players_count: 12,
        coach_name: 'Guo Shiqiang',
        is_active: true
      },
      {
        name: 'Beijing Ducks',
        city: 'Beijing',
        foundation_date: '1995-01-01',
        championships_won: 2,
        players_count: 12,
        coach_name: 'Yannis Christopoulos',
        is_active: true
      },
      {
        name: 'Shanghai Sharks',
        city: 'Shanghai',
        foundation_date: '1996-01-01',
        championships_won: 1,
        players_count: 12,
        coach_name: 'Li Nan',
        is_active: true
      },
      {
        name: 'Zhejiang Lions',
        city: 'Zhejiang',
        foundation_date: '2000-01-01',
        championships_won: 0,
        players_count: 12,
        coach_name: 'Zhao Jiwei',
        is_active: true
      },
      // Times da Alemanha
      {
        name: 'Bayern Munich',
        city: 'Munique',
        foundation_date: '1948-01-01',
        championships_won: 7,
        players_count: 12,
        coach_name: 'Andrea Trinchieri',
        is_active: true
      },
      {
        name: 'ALBA Berlin',
        city: 'Berlim',
        foundation_date: '1989-01-01',
        championships_won: 9,
        players_count: 12,
        coach_name: 'Israel Gonzalez',
        is_active: true
      },
      {
        name: 'Brose Bamberg',
        city: 'Bamberg',
        foundation_date: '1955-01-01',
        championships_won: 8,
        players_count: 12,
        coach_name: 'Oren Amiel',
        is_active: true
      },
      {
        name: 'MHP Riesen Ludwigsburg',
        city: 'Ludwigsburg',
        foundation_date: '2005-01-01',
        championships_won: 0,
        players_count: 12,
        coach_name: 'John Patrick',
        is_active: true
      }
    ]);

    res.status(201).json({ message: 'Banco de dados criado!' });

  } catch (error) {

    console.error('Erro:', error);

    res.status(500).json({ error: error.message });

  }

};
