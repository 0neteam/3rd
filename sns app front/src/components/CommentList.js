import React from 'react';

function CommentList({ comments }) {
    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {comments.map((comment) => (
                <li key={comment.id} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #eee', borderRadius: '3px' }}>
                    <p><strong>{comment.user?.username || '알 수 없는 사용자'}</strong>: {comment.content}</p> {/* 백엔드 User 정보 연결에 따라 수정 */}
                    {/* 삭제 기능 추가 (본인 댓글만 삭제 가능하도록) */}
                </li>
            ))}
            {comments.length === 0 && <p>댓글이 없습니다.</p>}
        </ul>
    );
}

export default CommentList;