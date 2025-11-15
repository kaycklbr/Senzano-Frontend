import { getAccessToken, logout } from '../auth/auth';
import axios from 'axios';
import CONFIG from '../constants/config';


const api = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 👉 Anexa token JWT automaticamente
api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Intercepta erro de autenticação e desloga
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const isUnauthorized = status === 401;

    if (isUnauthorized && !error.response.config.url?.includes('/auth/jwt/token')) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;