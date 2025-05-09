import api from '../axiosInstance';

const API_URL = "/likes";

// 게시글 좋아요
export const likePost = async (postId) => {
    try {
        const response = await api.post(`${API_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${postId} 좋아요 요청 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};

export const unlikePost = async (postId) => {
    try {
        const response = await api.delete(`${API_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${postId} 좋아요 취소 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};

// 댓글 좋아요
export const likeComment = async (commentId) => {
    try {
        const response = await api.post(`${API_URL}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error(`댓글 ${commentId} 좋아요 요청 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};

export const unlikeComment = async (commentId) => {
    try {
        const response = await api.delete(`${API_URL}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error(`댓글 ${commentId} 좋아요 취소 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};
