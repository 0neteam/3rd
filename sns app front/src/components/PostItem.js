// src/components/PostItem.js
import React from 'react';
import './PostItem.css'; // 필요하다면 스타일링

function PostItem() {
  return React.createElement(
    'div',
    { className: 'post-item' },
    React.createElement(
      'div',
      { className: 'post-header' },
      React.createElement(
        'div',
        { className: 'user-info' },
        React.createElement(
          'span',
          { className: 'username' },
          '사용자 이름'
        )
      ),
      React.createElement(
        'div',
        { className: 'post-actions' },
        /* 수정 및 삭제 버튼 (나중에 구현) */
      )
    ),
    React.createElement(
      'div',
      { className: 'post-content' },
      React.createElement(
        'p',
        null,
        '여기에 게시글 내용이 들어갑니다.'
      ),
      /* 이미지가 있다면 표시 */
      // React.createElement('img', { src: '이미지 URL', alt: '게시글 이미지' })
    ),
    React.createElement(
      'div',
      { className: 'post-footer' },
      React.createElement(
        'div',
        { className: 'like-comment' },
        React.createElement(
          'button',
          null,
          '좋아요'
        ),
        React.createElement(
          'span',
          null,
          '0'
        ),
        React.createElement(
          'button',
          null,
          '댓글'
        ),
        React.createElement(
          'span',
          null,
          '0'
        )
      ),
      /* 댓글 목록 (나중에 구현) */
      /* 댓글 작성 폼 (나중에 구현) */
    )
  );
}

export default PostItem;