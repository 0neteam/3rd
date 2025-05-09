import api from '../axiosInstance';

export const updatePost = async (id, postData) => {
    try {
        const response = await api.put(`/posts/${id}`, postData);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${id} 수정 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};