// utils/api.js

import { getAuthTokenFromCookies } from './cookies';

const API_BASE_URL = 'https://localhost:443/api/teams';

// Função para buscar todos os times
export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar os times');
    }
    const data = await response.json();
    return data.teams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para buscar um time pelo nome
export const fetchTeamByName = async (name) => {
  try {
    const token = getAuthTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}/${name}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Time não encontrado');
    }
    const data = await response.json();
    return data.team;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para adicionar um novo time
export const addTeam = async (teamData) => {
  try {
    const token = getAuthTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar o time');
    }
    const data = await response.json();
    return data.team;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para atualizar um time existente
export const updateTeam = async (teamId, teamData) => {
  try {
    const token = getAuthTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar o time');
    }
    const data = await response.json();
    return data.team;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para deletar um time
export const deleteTeam = async (teamId) => {
  try {
    const token = getAuthTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}/${teamId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar o time');
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    throw new Error(error.message);
  }
};