// src/components/Post.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Post from './Post';
import { deletePost } from '../services/postService';

jest.mock('../services/postService', () => ({
    deletePost: jest.fn(),
}));

describe('Post 컴포넌트', () => {
    const mockPost = {
        id: 1,
        title: '테스트 게시글',
        content: '테스트 내용',
    };

    const mockOnPostDeleted = jest.fn();

    it('게시글 정보를 올바르게 렌더링해야 합니다.', () => {
        render(<Post post={mockPost} onPostDeleted={mockOnPostDeleted} />);
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    });

    it('삭제 버튼을 클릭하면 deletePost 함수를 호출해야 합니다.', async () => {
        window.confirm = jest.fn(() => true);
        render(<Post post={mockPost} onPostDeleted={mockOnPostDeleted} />);
        fireEvent.click(screen.getByRole('button', { name: '삭제' }));
        await waitFor(() => expect(deletePost).toHaveBeenCalledWith(mockPost.id));
    });

    it('삭제 성공 시 onPostDeleted 함수를 호출해야 합니다.', async () => {
        window.confirm = jest.fn(() => true);
        deletePost.mockResolvedValueOnce({});
        render(<Post post={mockPost} onPostDeleted={mockOnPostDeleted} />);
        fireEvent.click(screen.getByRole('button', { name: '삭제' }));
        await waitFor(() => expect(mockOnPostDeleted).toHaveBeenCalledWith(mockPost.id));
    });

    it('삭제 실패 시 에러 메시지를 표시해야 합니다.', async () => {
        window.confirm = jest.fn(() => true);
        deletePost.mockRejectedValueOnce(new Error('삭제 실패'));
        render(<Post post={mockPost} onPostDeleted={mockOnPostDeleted} />);
        fireEvent.click(screen.getByRole('button', { name: '삭제' }));
        await waitFor(() => expect(screen.getByText('Error: 게시물 1 삭제에 실패했습니다.')).toBeInTheDocument()); // 수정된 부분
    });
});