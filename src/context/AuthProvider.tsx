import React, { useState, createContext, useEffect } from 'react';
import api from '../services/api';
import useLocalStorage from '../hooks/useLocalStorage';

type Props = {
  children?: React.ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: any;
  setToken: (token: string) => void;
  setUser: (newState: any) => void;
  login: (email: string, password: string, remember?: boolean) => void;
  logout: () => void;
}

const initialValue = {
  authenticated: !!JSON.parse(localStorage.getItem('access_token') || '""'),
  setAuthenticated: () => {},
  user: null,
  setToken: () => {},
  setUser: () => {},
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {

  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated);
  const [ user, setUser ] = useState(initialValue.user);

  const [ token, setToken ] = useLocalStorage('access_token', '');

  useEffect(() => {
    setAuthenticated(!!token);
  }, [token]);


  useEffect(() => {
    const loadUser = async () => {
      if(token){
        try {
          const { data } = await api.get('/convitin/v1/me');
          setUser(data);
        } catch (err) {
          console.error('Failed to load user', err);
        }
      }
      
    };
    loadUser();
  }, [token]);

  const login = async (email: string, password: string, remember = false) => {
    const { data } = await api.post('jwt-auth/v1/token', {
      username: email,
      password
    });

    setToken(data.data.token);
    return data;
    // setUser(data.user);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, setToken, setAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};