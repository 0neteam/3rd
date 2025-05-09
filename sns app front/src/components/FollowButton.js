// ✅ src/components/FollowButton.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FollowButton = ({ targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const res = await api.get(`/api/follow/status?targetId=${targetUserId}`);
        setIsFollowing(res.data); // 백엔드에서 Boolean 반환
      } catch (error) {
        if (error.response?.status === 401) {
          console.warn('로그인이 필요합니다.');
        } else {
          console.error('팔로우 상태 확인 실패:', error);
        }
      }
    };

    checkFollowingStatus();
  }, [targetUserId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/api/follow/${targetUserId}`);
      } else {
        await api.post(`/api/follow/${targetUserId}`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login'; // 또는 navigate 사용
      } else {
        console.error('팔로우/언팔로우 실패:', error);
      }
    }
  };

  return (
    <button 
      onClick={handleFollowToggle} 
      style={{
        padding: "8px 12px",
        backgroundColor: isFollowing ? "#dc3545" : "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </button>
  );
};

export default FollowButton;
