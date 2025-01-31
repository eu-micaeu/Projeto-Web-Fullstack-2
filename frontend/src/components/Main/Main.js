import { useEffect, useState } from 'react';
import './Main.css';
import { isAuthTokenValid } from '../../utils/cookies';
import { fetchTeams, fetchTeamByName, addTeam, deleteTeam, updateTeam } from '../../utils/api';
import { Button, Dialog, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

function Main() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchedTeam, setSearchedTeam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamToEdit, setTeamToEdit] = useState(null);
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

  const handleDeleteTeam = async (teamId) => {
    try {
      await deleteTeam(teamId);
      const updatedTeams = teams.filter(team => team.id !== teamId);
      setTeams(updatedTeams);
      setOpenTeamModal(false);
      setSearchedTeam(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTeam = async () => {
    try {
      const updatedTeam = await updateTeam(teamToEdit.id, teamToEdit);
      const updatedTeams = teams.map(team =>
        team.id === updatedTeam.id ? updatedTeam : team
      );
      setTeams(updatedTeams);
      setEditModalOpen(false);
      if (selectedTeam && selectedTeam.id === updatedTeam.id) {
        setSelectedTeam(updatedTeam);
      }
      if (searchedTeam && searchedTeam.id === updatedTeam.id) {
        setSearchedTeam(updatedTeam);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const renderTeamCard = (team) => (
    <div key={team.id} className="team-card" onClick={() => handleTeamClick(team)}>
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
      {isAuthTokenValid() && (
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setTeamToEdit(team);
              setEditModalOpen(true);
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteTeam(team.id)}
          >
            Deletar
          </Button>
        </div>
      )}
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

  const renderEditForm = () => (
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
          value={teamToEdit[field]}
          onChange={(e) => setTeamToEdit({ ...teamToEdit, [field]: e.target.value })}
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
        value={teamToEdit.foundation_date}
        onChange={(e) => setTeamToEdit({ ...teamToEdit, foundation_date: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        id="is_active"
        label="Ativo"
        select
        fullWidth
        margin="dense"
        name="is_active"
        value={teamToEdit.is_active}
        onChange={(e) => setTeamToEdit({ ...teamToEdit, is_active: e.target.value === 'true' })}
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
            <Button
              variant="contained"
              type="submit"
              className="submit-button"
              startIcon={<SearchIcon style={{ fontSize: 30 }} />} // Ícone maior
            >
            </Button>
          </form>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {searchedTeam && (
        <div className="searched-team">
          <h3>Time Encontrado:</h3>
          <div className="team-card">
            {renderTeamDetails(searchedTeam)}
          </div>
        </div>
      )}

      <h2 className="titule">Lista de todos os times:</h2>
      <div className="teams-container">
        {teams.length > 0 ? teams.map(renderTeamCard) : <p>Carregando times...</p>}
      </div>

      <Dialog open={openTeamModal} onClose={toggleTeamModal}>
        {selectedTeam && <DialogContent sx={{ gap: '1rem' }}>{renderTeamDetails(selectedTeam)}</DialogContent>}
      </Dialog>

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogContent>
          <h2>Editar Time</h2>
          {teamToEdit && renderEditForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="error">
            Fechar
          </Button>
          <Button onClick={handleUpdateTeam} variant="contained" color="primary">
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>

      {isAuthTokenValid() && (
        <div className="add-team-card">
          <h2>Adicionar Time</h2>
          <p>Conhece um time que não está na lista? Adicione ele!</p>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={toggleModal}
            className="submit-button"
          >
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