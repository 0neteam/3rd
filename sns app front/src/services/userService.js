// ✅ src/services/userService.js
import api from './api';

export const login = (credentials) => {
    return api.post('/api/users/login', credentials);
};

export const register = (userData) => {
    return api.post('/api/users/register', userData);
};

export const getCurrentUser = () => {
    return api.get('/api/users/me');
};
