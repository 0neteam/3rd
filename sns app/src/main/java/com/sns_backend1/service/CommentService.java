package com.sns_backend1.service;

import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.CommentRepository;
import com.sns_backend1.repository.PostRepository;
import com.sns_backend1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public Comment addComment(Long postId, String content, String email) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));

        Comment comment = Comment.builder()
            .post(post)
            .user(user)
            .content(content)
            .build();

        Comment savedComment = commentRepository.save(comment);

        if (!post.getUser().getId().equals(user.getId())) {
            notificationService.sendAndSaveNotification(
                post.getUser(),
                user.getUsername() + "님이 당신의 게시글에 댓글을 남겼습니다."
            );
        }

        return savedComment;
    }

    public Comment findById(Long commentId) {
        return commentRepository.findById(commentId)
            .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
    }

    public Comment findByIdWithPost(Long commentId) {
        return commentRepository.findByIdWithPost(commentId)
            .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
    }

    public List<Comment> findByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Transactional
    public void deleteComment(Long commentId, String email) {
        Comment comment = findById(commentId);
        if (!comment.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("본인의 댓글만 삭제할 수 있습니다.");
        }
        commentRepository.delete(comment);
    }

    // ✅ 댓글 수정 메서드
    @Transactional
    public void updateComment(Long commentId, String content, User user) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));

        if (!comment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("본인의 댓글만 수정할 수 있습니다.");
        }

        comment.setContent(content);
        commentRepository.save(comment);
    }
}
