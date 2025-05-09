import api from './axiosInstance';

export const login = async (credentials) => {
    try {
        const response = await api.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('로그인 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/users/signup', userData);
        return response.data;
    } catch (error) {
        console.error('회원가입 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};