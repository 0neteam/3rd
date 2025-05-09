import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import styled from 'styled-components';
import { getCurrentUser } from '../services/auth';

const PostContainer = styled.div`
  background: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #000;

  body.dark & {
    background-color: #1e1e1e;
    border-color: #444;
    color: #f0f0f0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserName = styled(Link)`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  body.dark & {
    color: #ddd;
  }
`;

const Content = styled.p`
  font-size: 16px;
  margin: 10px 0;

  body.dark & {
    color: #ccc;
  }
`;

const CommentSection = styled.div`
  margin-top: 15px;
`;

const CommentInput = styled.input`
  width: 80%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;

  body.dark & {
    background-color: #333;
    border-color: #555;
    color: #eee;
  }
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  margin-left: 8px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentWrapper = styled.div`
  margin-bottom: 8px;
  padding-left: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px 12px;
  color: #000;

  .meta {
    font-size: 12px;
    color: gray;
    margin-top: 4px;
  }

  body.dark & {
    background-color: #1e1e1e;
    color: #e0e0e0;
    .meta {
      color: #ccc;
    }
  }
`;

const Post = ({ post, onPostDeleted, onEditClick = () => {} }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.roles === 'ROLE_ADMIN';
  const isMine = post.isMine;
  const fullProfileImg = post.userProfileImageUrl?.startsWith('http')
    ? post.userProfileImageUrl
    : `http://localhost:8081${post.userProfileImageUrl}`;

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        await api.delete(`/api/posts/${id}`);
        onPostDeleted(id);
      } catch (err) {
        setError('삭제 실패: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/api/comments/${post.id}`, null, { params: { content: newComment } });
      setComments(prev => [...prev, res.data]);
      setCommentCount(prev => prev + 1);
      setNewComment('');
    } catch (err) {
      console.error('댓글 작성 실패:', err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/api/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
      setCommentCount(prev => prev - 1);
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
    }
  };

  const handleCommentEdit = async (commentId) => {
    try {
      await api.put(`/api/comments/${commentId}`, null, { params: { content: editingContent } });
      setComments(prev => prev.map(c => (c.id === commentId ? { ...c, content: editingContent } : c)));
      setEditingCommentId(null);
      setEditingContent('');
    } catch (err) {
      console.error('댓글 수정 실패:', err);
    }
  };

  const handleCommentLike = async (commentId, liked) => {
    try {
      if (liked) {
        await api.delete(`/api/likes/comments/${commentId}`);
      } else {
        await api.post(`/api/likes/comments/${commentId}`);
      }
      setComments(prev =>
        prev.map(c =>
          c.id === commentId
            ? {
                ...c,
                isLiked: !liked,
                likeCount: liked ? (c.likeCount || 1) - 1 : (c.likeCount || 0) + 1,
              }
            : c
        )
      );
    } catch (err) {
      console.error('댓글 좋아요 실패:', err);
    }
  };

  const handlePostLike = async () => {
    try {
      await api.post(`/api/likes/posts/${post.id}`);
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    } catch (err) {
      console.error('게시글 좋아요 실패:', err);
    }
  };

  return (
    <PostContainer>
      {loading && <p>삭제 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UserInfo>
        <ProfileImg
          src={fullProfileImg || '/default-profile.png'}
          alt="프로필"
          onError={(e) => { e.target.src = '/default-profile.png'; }}
        />
        <UserName to={`/profile/${post.userId}`}>{post.username}</UserName>
      </UserInfo>

      <Content>{post.content}</Content>

      <p style={{ fontSize: '13px', color: '#999' }}>
        🕒 작성 시간: {new Date(post.createdAt).toLocaleString()}
      </p>

      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={handlePostLike}
          disabled={isLiked}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: isLiked ? 'default' : 'pointer',
            color: isLiked ? 'red' : 'gray',
            fontSize: '18px'
          }}
        >
          ❤️ {likeCount}
        </button>
      </div>

      <p style={{ fontSize: '14px', color: '#666' }}>💬 댓글 {commentCount}개</p>

      {comments.map(comment => (
        <CommentWrapper key={comment.id}>
          <strong>{comment.username}</strong>:&nbsp;
          {editingCommentId === comment.id ? (
            <>
              <input
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                style={{ width: '60%' }}
              />
              <button onClick={() => handleCommentEdit(comment.id)} style={{ marginLeft: '5px' }}>저장</button>
              <button onClick={() => setEditingCommentId(null)} style={{ marginLeft: '5px' }}>취소</button>
            </>
          ) : (
            <>
              {comment.content}
              <div className="meta">
                🕒 {new Date(comment.createdAt).toLocaleString()}
              </div>
              {comment.isMine && (
                <>
                  <button onClick={() => {
                    setEditingCommentId(comment.id);
                    setEditingContent(comment.content);
                  }} style={{ marginLeft: '8px' }}>✏️ 수정</button>
                  <button onClick={() => handleCommentDelete(comment.id)} style={{ marginLeft: '5px' }}>🗑️ 삭제</button>
                </>
              )}
              <button
                onClick={() => handleCommentLike(comment.id, comment.isLiked)}
                style={{
                  marginLeft: '8px',
                  color: comment.isLiked ? 'red' : 'gray',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                ❤️ {comment.likeCount || 0}
              </button>
            </>
          )}
        </CommentWrapper>
      ))}

      <CommentSection>
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '10px', display: 'flex' }}>
          <CommentInput
            type="text"
            placeholder="댓글 작성..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentButton type="submit">작성</CommentButton>
        </form>
      </CommentSection>

      {(isMine || isAdmin) && (
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <button onClick={() => onEditClick(post)} style={{ marginRight: '10px' }}>
            ✏️ 수정
          </button>
          <button onClick={() => handleDelete(post.id)} style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '5px'
          }}>
            삭제
          </button>
        </div>
      )}
    </PostContainer>
  );
};

export default Post;
