-- Criação da tabela Users
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Criação da tabela Teams
CREATE TABLE Teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  foundation_date DATE NOT NULL,
  championships_won INT NOT NULL,
  players_count INT NOT NULL,
  coach_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL
);

-- Inserção dos dados na tabela Teams
INSERT INTO Teams (name, city, foundation_date, championships_won, players_count, coach_name, is_active) VALUES
('Los Angeles Lakers', 'Los Angeles', '1947-11-01', 17, 15, 'Darvin Ham', TRUE),
('Golden State Warriors', 'San Francisco', '1946-01-01', 7, 15, 'Steve Kerr', TRUE),
('Miami Heat', 'Miami', '1988-04-05', 3, 15, 'Erik Spoelstra', TRUE),
('Boston Celtics', 'Boston', '1946-06-06', 17, 15, 'Joe Mazzulla', TRUE),
('Chicago Bulls', 'Chicago', '1966-01-16', 6, 15, 'Billy Donovan', TRUE),
('Brooklyn Nets', 'Brooklyn', '1967-01-01', 0, 15, 'Jacque Vaughn', TRUE),
('Philadelphia 76ers', 'Philadelphia', '1946-12-22', 3, 15, 'Nick Nurse', TRUE),
('Houston Rockets', 'Houston', '1967-05-11', 2, 15, 'Ime Udoka', TRUE),
('Dallas Mavericks', 'Dallas', '1980-06-13', 1, 15, 'Jason Kidd', TRUE),
('Phoenix Suns', 'Phoenix', '1968-01-28', 0, 15, 'Frank Vogel', TRUE),
('Toronto Raptors', 'Toronto', '1995-06-07', 1, 15, 'Darko Rajakovic', TRUE),
('Indiana Pacers', 'Indianapolis', '1967-01-01', 0, 15, 'Rick Carlisle', TRUE),
('Memphis Grizzlies', 'Memphis', '1995-06-06', 0, 15, 'Taylor Jenkins', TRUE),
('Sacramento Kings', 'Sacramento', '1945-04-09', 1, 15, 'Mike Brown', TRUE),
('Detroit Pistons', 'Detroit', '1941-08-01', 3, 15, 'Monty Williams', TRUE),
('Atlanta Hawks', 'Atlanta', '1946-01-01', 1, 15, 'Quin Snyder', TRUE),
('Charlotte Hornets', 'Charlotte', '1988-05-11', 0, 15, 'Steve Clifford', TRUE),
('Minnesota Timberwolves', 'Minneapolis', '1989-01-28', 0, 15, 'Chris Finch', TRUE),
('Oklahoma City Thunder', 'Oklahoma City', '1967-01-01', 0, 15, 'Mark Daigneault', TRUE),
('Orlando Magic', 'Orlando', '1989-04-04', 0, 15, 'Jamahl Mosley', TRUE),
('Washington Wizards', 'Washington', '1961-01-01', 1, 15, 'Wes Unseld Jr.', TRUE),
('Flamengo', 'Rio de Janeiro', '1927-03-19', 6, 12, 'José Neto', TRUE),
('São Paulo FC', 'São Paulo', '1929-12-02', 0, 12, 'Cláudio Mortari', TRUE),
('Franca Basquete', 'Franca', '1950-08-02', 12, 12, 'Helinho', TRUE),
('Bauru Basket', 'Bauru', '2006-10-11', 0, 12, 'Demétrius Ferracciú', TRUE),
('Minas Tênis Clube', 'Belo Horizonte', '1935-10-11', 0, 12, 'Léo Costa', TRUE),
('Alvark Tokyo', 'Tóquio', '2000-01-01', 2, 12, 'Zeljko Obradovic', TRUE),
('Chiba Jets', 'Chiba', '2005-03-01', 1, 12, 'Aaron Bruce', TRUE),
('Akita Northern Happinets', 'Akita', '2005-12-01', 0, 12, 'David Benoit', TRUE),
('Utsunomiya Brex', 'Utsunomiya', '2000-01-01', 1, 12, 'Tomohiro Sato', TRUE),
('Tamagawa Gakuen Big Blue', 'Tamagawa', '1997-09-01', 0, 12, 'Kiyohiko Noguchi', TRUE),
('Real Madrid', 'Madrid', '1931-12-19', 35, 12, 'Pablo Laso', TRUE),
('FC Barcelona', 'Barcelona', '1926-08-24', 2, 12, 'Sarunas Jasikevicius', TRUE),
('Baskonia', 'Vitoria-Gasteiz', '1959-03-01', 3, 12, 'Dusko Ivanovic', TRUE),
('Valencia Basket', 'Valência', '1986-01-01', 1, 12, 'Jaume Ponsarnau', TRUE),
('Unicaja Málaga', 'Málaga', '1992-07-01', 1, 12, 'Ibon Navarro', TRUE),
('Guangdong Southern Tigers', 'Guangdong', '1993-01-01', 11, 12, 'Du Feng', TRUE),
('Liaoning Flying Leopards', 'Liaoning', '1995-01-01', 2, 12, 'Guo Shiqiang', TRUE),
('Beijing Ducks', 'Beijing', '1995-01-01', 2, 12, 'Yannis Christopoulos', TRUE),
('Shanghai Sharks', 'Shanghai', '1996-01-01', 1, 12, 'Li Nan', TRUE),
('Zhejiang Lions', 'Zhejiang', '2000-01-01', 0, 12, 'Zhao Jiwei', TRUE),
('Bayern Munich', 'Munique', '1948-01-01', 7, 12, 'Andrea Trinchieri', TRUE),
('ALBA Berlin', 'Berlim', '1989-01-01', 9, 12, 'Israel Gonzalez', TRUE),
('Brose Bamberg', 'Bamberg', '1955-01-01', 8, 12, 'Oren Amiel', TRUE),
('MHP Riesen Ludwigsburg', 'Ludwigsburg', '2005-01-01', 0, 12, 'John Patrick', TRUE);
