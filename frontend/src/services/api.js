// frontend/src/services/api.js
// Instancia de Axios centralizada con interceptors para inyección de token
// y manejo automático de expiración de sesión.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de petición: inyecta el JWT en cada llamada si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('yuncar_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: detecta 401 (token expirado/inválido) y redirige al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('yuncar_token');
      localStorage.removeItem('yuncar_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;