// frontend/src/services/authService.js
// Encapsula login/logout y acceso al usuario y token guardados en localStorage.

import api from './api';

const TOKEN_KEY = 'yuncar_token';
const USER_KEY = 'yuncar_user';

async function login(username, password) {
  const response = await api.post('/api/auth/login', { username, password });
  const { token, user } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { token, user };
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser() {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

function isAuthenticated() {
  return !!getToken();
}

export default {
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated
};