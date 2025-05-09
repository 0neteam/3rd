// src/api/post.js
import api from './axiosInstance'; // 올바른 경로로 import

export const createPost = async (formData) => {
    try {
        const response = await api.post('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, // 이미지 업로드를 위한 설정
        });
        return response.data;
    } catch (error) {
        console.error('게시글 생성 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};

export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error('게시글 목록 조회 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};

export const getPostById = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('특정 게시글 조회 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};

export const getUserPosts = async (userId) => {
    try {
        const response = await api.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('사용자 게시글 목록 조회 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data; // 또는 response.status 등 백엔드 응답에 맞춰 수정
    } catch (error) {
        console.error('게시글 삭제 API 에러:', error);
        throw error.response ? error.response.data : error;
    }
};