import api from '../axiosInstance';

export const getUserPosts = async (userId) => {
    try {
        const response = await api.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`사용자 ${userId} 게시글 목록 조회 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};