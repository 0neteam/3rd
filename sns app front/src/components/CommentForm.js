import React, { useState } from 'react';
import { addComment } from '../services/commentService'; // 수정된 임포트 경로

function CommentForm({ postId, onCommentAdded }) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!content.trim()) {
            setError('댓글 내용을 입력해주세요.');
            setIsSubmitting(false);
            return;
        }

        try {
            await addComment(postId, { content }); // 댓글 데이터 객체로 전달
            setContent('');
            if (onCommentAdded) {
                onCommentAdded();
            }
        } catch (error) {
            console.error('댓글 작성 실패:', error);
            setError(error.message || '댓글 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px', display: 'flex' }}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요"
                style={{ flexGrow: 1, padding: '8px', marginRight: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
            />
            <button type="submit" disabled={isSubmitting} style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                {isSubmitting ? '작성 중...' : '댓글 작성'}
            </button>
            {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
        </form>
    );
}

export default CommentForm;