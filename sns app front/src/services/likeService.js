// src/services/likeService.js
import api from "./api"; // 수정된 import 경로

export const likePost = async (postId, userData) => {
    try {
        const response = await api.post(`/likes/${postId}/like`, userData);
        return response.data;
    } catch (error) {
        console.error("좋아요 요청 중 오류:", error);
        throw error;
    }
};

export const unlikePost = async (postId, userData) => {
    try {
        const response = await api.delete(`/likes/${postId}/unlike`, { data: userData });
        return response.data;
    } catch (error) {
        console.error("좋아요 취소 요청 중 오류:", error);
        throw error;
    }
};

// getPostLikes 함수 구현 (예시)
export const getPostLikes = async (postId) => {
    try {
        const response = await api.get(`/likes/${postId}/count`); // 좋아요 수 조회 API 엔드포인트는 서버에 따라 다를 수 있습니다.
        return response.data; // 서버 응답 전체를 반환 (count 속성 확인 필요)
    } catch (error) {
        console.error("좋아요 수 조회 중 오류:", error);
        throw error;
    }
};