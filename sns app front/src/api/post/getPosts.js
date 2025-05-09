import api from '../axiosInstance';

export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error('전체 게시글 목록 조회 실패:', error);
        throw error.response ? error.response.data : error;
    }
};