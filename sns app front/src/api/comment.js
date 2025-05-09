import api from './api';  

const API_URL = "/comments";

export const addComment = async (postId, commentData) => {
    try {
        const response = await api.post(`${API_URL}/${postId}`, commentData);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${postId} 댓글 작성 실패:`, error);
        throw error.response?.data || error;
    }
};

export const getComments = async (postId) => {
    try {
        const response = await api.get(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${postId} 댓글 목록 조회 실패:`, error);
        throw error.response?.data || error;
    }
};
