// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/users'; 

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || '회원 가입에 실패했습니다.';
    }
};

export const login = async (credentials) => { 
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || '로그인에 실패했습니다.';
    }
};