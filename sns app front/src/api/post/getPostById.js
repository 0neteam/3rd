import api from '../axiosInstance';

export const getPostById = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${id} 조회 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};