// src/services/postService.js
import api from './api';

const API_URL = "/api/posts";

export const createPost = async ({ content, image }) => {
    try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }
        return await api.post(API_URL, formData);
    } catch (error) {
        console.error("게시물 작성 실패:", error);
        const message = error?.response?.data?.message || "게시물 작성에 실패했습니다.";
        throw new Error(message);
    }
};

export const deletePost = async (id) => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("게시물 삭제 실패:", error);
        const message = error?.response?.data?.message || `게시물 ${id} 삭제에 실패했습니다.`;
        throw new Error(message);
    }
};

export const getPostById = async (id) => {
    try {
        return await api.get(`${API_URL}/${id}`);
    } catch (error) {
        console.error("게시물 조회 실패:", error);
        throw error;
    }
};

export const getUserPosts = async (userId) => {
    try {
        return await api.get(`${API_URL}/user/${userId}`);
    } catch (error) {
        console.error("사용자 게시물 조회 실패:", error);
        throw error;
    }
};

export const updatePost = async (id, { content, image }) => {
    try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }
        return await api.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error(`게시물 ${id} 수정 실패:`, error);
        throw error;
    }
};

export const patchPost = async (id, partialPostData) => {
    try {
        return await api.patch(`${API_URL}/${id}`, partialPostData);
    } catch (error) {
        console.error(`게시물 ${id} 부분 수정 실패:`, error);
        throw error;
    }
};

export const getPostsFromService = async () => {
    try {
        return await api.get(API_URL);
    } catch (error) {
        console.error("전체 게시글 목록 조회 실패:", error);
        throw error;
    }
};
