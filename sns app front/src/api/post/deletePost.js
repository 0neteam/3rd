import api from '../axiosInstance';

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${id} 삭제 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};