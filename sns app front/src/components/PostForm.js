import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../services/postService';

function PostForm({ onPostCreated, postToEdit, onPostUpdated, onCancelEdit }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (postToEdit) {
            setContent(postToEdit.content || '');
            setImage(null); // 기존 이미지는 서버에서 유지
        } else {
            setContent('');
            setImage(null);
        }
    }, [postToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!content.trim()) {
            setError('내용을 입력해주세요.');
            setIsSubmitting(false);
            return;
        }

        try {
            if (postToEdit) {
                await updatePost(postToEdit.id, { content, image });
                onPostUpdated?.(); // 수정 후 목록 새로고침
            } else {
                await createPost({ content, image });
                onPostCreated?.();
            }

            setContent('');
            setImage(null);
            onCancelEdit?.();
        } catch (error) {
            console.error('게시글 처리 실패:', error);
            setError('게시글 처리에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>{postToEdit ? '게시글 수정' : '새 게시글 작성'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    rows={3}
                    required
                />
            </div>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '처리 중...' : postToEdit ? '수정 완료' : '작성하기'}
            </button>
            {postToEdit && (
                <button type="button" onClick={onCancelEdit} style={{ marginLeft: '10px' }}>
                    취소
                </button>
            )}
        </form>
    );
}

export default PostForm;
