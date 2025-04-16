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
  setUser: (newState: any) => void;
  login: (email: string, password: string, remember?: boolean) => void;
  logout: () => void;
}

const initialValue = {
  authenticated: !!localStorage.getItem('token'),
  setAuthenticated: () => {},
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {

  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated);
  const [ user, setUser ] = useState(initialValue.user);

  const [ token, setToken ] = useLocalStorage('token', '');

  useEffect(() => {
    setAuthenticated(!!token);
  }, [token]);


  useEffect(() => {
    const loadUser = async () => {
      if(token){
        try {
          const { data } = await api.get('/accounts/my/');
          setUser(data);
        } catch (err) {
          console.error('Failed to load user', err);
        }
      }
      
    };
    loadUser();
  }, [token]);

  const login = async (email: string, password: string, remember = false) => {
    const { data } = await api.post('/token/', {
      username: email,
      password,
      remember
    });

    setToken(data.access);
    // setUser(data.user);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};