import axios from "axios";


const api = axios.create({
  // baseURL: 'https://sefaz-api.fisconorte.com.br/',
  baseURL: 'https://rifafacil.online/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token') || '');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response;
},
(error) => {
  if (error.response && [401, 403].includes(error.response.status) && !['/auth/login'].includes(window.location.pathname)) {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  return Promise.reject(error);
})

export default api;
