import React, { useState } from 'react';
import { likeComment, unlikeComment } from '../api/like';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Comment = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await unlikeComment(comment.id);
        setLikeCount((prev) => prev - 1);
      } else {
        await likeComment(comment.id);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('댓글 좋아요 에러:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-lg my-2">
      <div className="text-sm">{comment.content}</div>
      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
        <span>{comment.username}</span>
        <div className="flex items-center gap-1">
          <button onClick={handleLikeToggle}>
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
