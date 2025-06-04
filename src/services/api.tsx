import { getAccessToken, logout } from '../auth/auth';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://convitin.com.br/wp-json',
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
    const code = error.response?.data?.code;

    const isInvalidToken =
      status === 403 && code === 'jwt_auth_invalid_token';
    const isUnauthorized = status === 401;

    if (isInvalidToken || isUnauthorized) {
      // logout();
    }

    return Promise.reject(error);
  }
);

export default api;