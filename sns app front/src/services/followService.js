// src/services/followService.js
import api from "./api";

export const followUser = async (targetUserId, token) => {
  try {
    const response = await api.post(`/follow/${targetUserId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("팔로우 요청 중 오류:", error);
    throw error;
  }
};

export const unfollowUser = async (targetUserId, token) => {
  try {
    const response = await api.delete(`/follow/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("언팔로우 요청 중 오류:", error);
    throw error;
  }
};

export const checkFollowing = async (targetUserId, token) => {
  try {
    const response = await api.get(`/follow/check/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("팔로우 상태 확인 중 오류:", error);
    throw error;
  }
};