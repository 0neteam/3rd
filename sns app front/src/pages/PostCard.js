import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PostCard = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const countRes = await api.get(`/api/likes/count?postId=${post.id}`);
        const likedRes = await api.get(`/api/likes/isLiked?postId=${post.id}`); // ✅ 로그인 유저 기준 좋아요 여부
        setLikeCount(countRes.data);
        setLiked(likedRes.data); // true / false
      } catch (err) {
        console.error('좋아요 정보 가져오기 실패:', err);
      }
    };
    fetchLikeData();
  }, [post.id]);

  const handleLike = async () => {
    try {
      if (liked) {
        await api.delete(`/api/likes/${post.id}`);
        setLikeCount((prev) => prev - 1);
      } else {
        await api.post(`/api/likes/${post.id}`);
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error('좋아요 처리 실패:', err);
    }
  };

  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={handleLike}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
        <span style={{ marginLeft: '8px' }}>{likeCount} 좋아요</span>
      </div>
    </div>
  );
};

export default PostCard;
