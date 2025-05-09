import api from '../axiosInstance';

export const patchPost = async (id, partialPostData) => {
    try {
        const response = await api.patch(`/posts/${id}`, partialPostData);
        return response.data;
    } catch (error) {
        console.error(`게시글 ${id} 부분 수정 실패:`, error);
        throw error.response ? error.response.data : error;
    }
};