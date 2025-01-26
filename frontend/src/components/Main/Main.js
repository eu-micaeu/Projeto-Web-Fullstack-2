import { useEffect, useState } from 'react';
import './Main.css';
import { isAuthTokenValid, getAuthTokenFromCookies } from '../../utils/cookies';

// Importação MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Main() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchedTeam, setSearchedTeam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    city: '',
    foundation_date: '',
    championships_won: '',
    coach_name: '',
    players_count: '',
    is_active: true,
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/teams/readTeams')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os times');
        }
        return response.json();
      })
      .then(data => setTeams(data.teams))
      .catch(error => setError(error.message));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    const token = getAuthTokenFromCookies();
    fetch(`http://localhost:3000/api/teams/readTeamByName/${searchName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Time não encontrado');
        }
        return response.json();
      })
      .then(data => {
        setSearchedTeam(data.team);
        setError(null);
      })
      .catch(error => {
        setSearchedTeam(null);
        setError(error.message);
      });
  };

  const toggleModal = () => setOpenModal(!openModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    setError(null);
    const token = getAuthTokenFromCookies();
    fetch('http://localhost:3000/api/teams/createTeam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTeam),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar o time');
        }
        return response.json();
      })
      .then(data => {
        setTeams([...teams, data.team]);
        toggleModal();
      })
      .catch(error => setError(error.message));
  };

  return (
    <main>
      <h2>Times Históricos do Basquete!</h2>

      {!isAuthTokenValid() && (
        <p>Conhece mais algum? Faça o Login no nosso site e adicione ele!</p>
      )}

      {isAuthTokenValid() && (
        <div className="search-team-form">
          <form onSubmit={handleSearch}>
            <TextField
              id="search"
              label="Buscar Time"
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" type="submit">
              Buscar
            </Button>
          </form>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {searchedTeam && (
        <div className="searched-team">
          <h3>Time Encontrado:</h3>
          <div className="team-card">
            <h2>{searchedTeam.name}</h2>
            <p><strong>Cidade:</strong> {searchedTeam.city}</p>
            <p><strong>Fundação:</strong> {searchedTeam.foundation_date}</p>
            <p><strong>Campeonatos Ganhos:</strong> {searchedTeam.championships_won}</p>
            <p><strong>Treinador:</strong> {searchedTeam.coach_name}</p>
            <p><strong>Número de Jogadores:</strong> {searchedTeam.players_count}</p>
            <p><strong>Ativo:</strong> {searchedTeam.is_active ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      )}

      <h2 className="titule">Lista de todos os times:</h2>

      <div className="teams-container">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.team_id} className="team-card">
              <h2>{team.name}</h2>
              <p><strong>Cidade:</strong> {team.city}</p>
              <p><strong>Fundação:</strong> {team.foundation_date}</p>
              <p><strong>Campeonatos Ganhos:</strong> {team.championships_won}</p>
              <p><strong>Treinador:</strong> {team.coach_name}</p>
              <p><strong>Número de Jogadores:</strong> {team.players_count}</p>
              <p><strong>Ativo:</strong> {team.is_active ? 'Sim' : 'Não'}</p>
            </div>
          ))
        ) : (
          <p>Carregando times...</p>
        )}
        {isAuthTokenValid() && (
          <div className="team-card add-team-card">
            <h2>Adicionar Time</h2>
            <p>Conhece um time que não está na lista? Adicione ele!</p>
            <Button variant="contained" onClick={toggleModal}>
              Adicionar Time
            </Button>
          </div>
        )}
      </div>

      <Dialog open={openModal} onClose={toggleModal}>
        <DialogContent>
          <h2>Adicionar Time</h2>
          <form onSubmit={handleAddTeam}>
            {['name', 'city', 'championships_won', 'coach_name', 'players_count'].map((field) => (
              <TextField
                key={field}
                id={field}
                label={field.replace('_', ' ')}
                variant="outlined"
                fullWidth
                margin="dense"
                name={field}
                value={newTeam[field]}
                onChange={handleInputChange}
              />
            ))}
            <TextField
              id="foundation_date"
              label="Data de Fundação"
              type="date"
              variant="outlined"
              fullWidth
              margin="dense"
              name="foundation_date"
              value={newTeam.foundation_date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="is_active"
              label="Ativo"
              select
              fullWidth
              margin="dense"
              name="is_active"
              value={newTeam.is_active}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="error">Fechar</Button>
          <Button onClick={handleAddTeam} variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default Main;
