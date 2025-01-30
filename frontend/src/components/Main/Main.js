import { useEffect, useState } from 'react';
import './Main.css';
import { isAuthTokenValid } from '../../utils/cookies';
import { fetchTeams, fetchTeamByName, addTeam } from '../../utils/api';
import { Button, Dialog, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';

function Main() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchedTeam, setSearchedTeam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
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
    const loadTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (error) {
        setError(error.message);
      }
    };
    loadTeams();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    if (!searchName.trim()) return setSearchedTeam(null);

    try {
      const teamData = await fetchTeamByName(searchName);
      setSearchedTeam(teamData);
    } catch (error) {
      setSearchedTeam(null);
      setError(error.message);
    }
  };

  const toggleModal = () => setOpenModal(!openModal);
  const toggleTeamModal = () => setOpenTeamModal(!openTeamModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const addedTeam = await addTeam(newTeam);
      setTeams([...teams, addedTeam]);
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    toggleTeamModal();
  };

  const renderTeamCard = (team) => (
    <div key={team.team_id} className="team-card" onClick={() => handleTeamClick(team)}>
      <h3>{team.name}</h3>
    </div>
  );

  const renderTeamDetails = (team) => (
    <>
      <h2>{team.name}</h2>
      <p><strong>Cidade:</strong> {team.city}</p>
      <p><strong>Fundação:</strong> {team.foundation_date}</p>
      <p><strong>Títulos:</strong> {team.championships_won}</p>
      <p><strong>Treinador:</strong> {team.coach_name}</p>
      <p><strong>Jogadores:</strong> {team.players_count}</p>
      <p><strong>Ativo:</strong> {team.is_active ? 'Sim' : 'Não'}</p>
    </>
  );

  const renderFormFields = () => (
    <>
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
        InputLabelProps={{ shrink: true }}
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
    </>
  );

  return (
    <main>
      <h2>Times Históricos do Basquete!</h2>

      {!isAuthTokenValid() && <p>Conhece mais algum? Faça o Login no nosso site e adicione ele!</p>}

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
            <Button variant="contained" type="submit" className="submit-button">
              Buscar
            </Button>
          </form>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {searchedTeam && (
        <div className="searched-team">
          <h3>Time Encontrado:</h3>
          <div className="team-card">{renderTeamDetails(searchedTeam)}</div>
        </div>
      )}

      <h2 className="titule">Lista de todos os times:</h2>
      <div className="teams-container">
        {teams.length > 0 ? teams.map(renderTeamCard) : <p>Carregando times...</p>}
      </div>

      <Dialog open={openTeamModal} onClose={toggleTeamModal}>
        {selectedTeam && <DialogContent sx={{ gap: '1rem' }}>{renderTeamDetails(selectedTeam)}</DialogContent>}
      </Dialog>

      {isAuthTokenValid() && (
        <div className="add-team-card">
          <h2>Adicionar Time</h2>
          <p>Conhece um time que não está na lista? Adicione ele!</p>
          <Button variant="contained" onClick={toggleModal} className="submit-button">
            Adicionar
          </Button>
        </div>
      )}

      <Dialog open={openModal} onClose={toggleModal}>
        <DialogContent>
          <h2>Adicionar Time</h2>
          <form onSubmit={handleAddTeam}>{renderFormFields()}</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="error">Fechar</Button>
          <Button onClick={handleAddTeam} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default Main;