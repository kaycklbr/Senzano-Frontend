import api from "../services/api";

export const getAccessToken = () => JSON.parse(localStorage.getItem('access_token'));
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setTokens = ({ access_token, refresh_token = null }) => {
  localStorage.setItem('access_token', access_token);
  if (refresh_token) localStorage.setItem('refreshToken', refresh_token);
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refreshToken');
};

export const logout = () => {
  clearTokens();
  window.location.href = '/login'; // ou navegação programada
};

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  data?: any;
}

