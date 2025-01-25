import { useEffect, useState } from 'react';
import './Main.css';
import { isAuthTokenValid, getAuthTokenFromCookies } from '../../utils/cookies';

// Importar o Button do Material-UI
import Button from '@material-ui/core/Button';

function Main() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchedTeam, setSearchedTeam] = useState(null);

  // Carregar todos os times
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

  // Função para buscar time por nome com autenticação
  const handleSearch = (e) => {
    e.preventDefault();

    // Limpa o erro sempre que começa uma nova busca
    setError(null);

    const token = getAuthTokenFromCookies(); // Função que retorna o token armazenado nos cookies
    fetch(`http://localhost:3000/api/teams/readTeamByName/${searchName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
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
        setError(null);  // Limpa qualquer erro se a busca for bem-sucedida
      })
      .catch(error => {
        setSearchedTeam(null); // Limpa o time buscado se houver erro
        setError(error.message);
      });
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
            <label htmlFor="name">Buscar Time:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite o nome do time..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              className="submit-button"
            >
              Buscar
            </Button>
          </form>
        </div>
      )}

      {/* Exibe o erro caso haja */}
      {error && <p className="error-message">{error}</p>}

      {/* Exibir o time buscado */}
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

      <h2 className='titule'>Lista de todos os times:</h2>

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
            <Button variant="contained" color="secondary">
              Adicionar Time
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Main;
