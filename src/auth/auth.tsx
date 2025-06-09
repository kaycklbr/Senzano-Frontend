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

export const register = async (name, email, password) => {
  const { data } = await api.post('convitin/v1/register', {
    name,
    email, 
    password
  });
  return data;
}

export const login = async (username, password) => {
  try{
    const { data } = await api.post('jwt-auth/v1/token', {
      username, password
    }, {
      headers: {
        'Authorization': 'bearer null'
      }
    });
    return data;
  }catch(e){
    return e.response?.data || { success: false, message: e.message }
  }
}