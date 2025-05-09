// src/components/PostEditForm.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
`;

const PostEditForm = ({ post, onClose, onUpdated }) => {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.put(`/api/posts/${post.id}`, { title, content });
      onUpdated();  // 수정 후 다시 불러오기
      onClose();    // 모달 닫기
    } catch (err) {
      setError('수정 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>게시글 수정</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>내용:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading}>{loading ? '수정 중...' : '수정 완료'}</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>취소</button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostEditForm;
