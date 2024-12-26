import { useEffect, useState } from 'react';
import './Main.css';

function Main() {

    const [teams, setTeams] = useState([]); 

    const [error, setError] = useState(null); 

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

    return (

        <main>

            <h2>Times Históricos do Basquete!</h2>

            <p>Conhece mais algum? Faça o Login no nosso site e adicione ele!</p>

            {error && <p>{error}</p>} 

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

            </div>

        </main>

    );

}

export default Main;
