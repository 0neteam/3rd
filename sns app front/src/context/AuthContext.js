import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import * as userService from '../services/userService';
import { disconnectWebSocket } from '../services/socket';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  const updateAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      setUser(null);
    }
    setAuthToken(token);
  };

  const updateUser = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.username);
  };

  const fetchUserInfo = async () => {
    try {
      const res = await api.get('/api/users/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      updateUser(res.data);
    } catch (error) {
      console.error('❌ 사용자 정보 불러오기 실패:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const res = await userService.login({ email, password });
      const token = res.headers['authorization'].replace('Bearer ', '');
      updateAuthToken(token);
      await fetchUserInfo();
      navigate('/');
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      throw error;
    }
  };

  const logout = () => {
    updateAuthToken(null);
    disconnectWebSocket();
    navigate('/login');
  };

  useEffect(() => {
    if (authToken && !user) {
      fetchUserInfo();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{
      authToken,
      user,
      isAuthenticated,
      login,
      logout,
      updateAuthToken,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
