package com.sns_backend1.repository;

import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    List<Comment> findByPostId(Long postId);

    // ✅ 댓글 + 게시글(post)까지 fetch 해서 가져옴 (댓글 좋아요용)
    @Query("SELECT c FROM Comment c JOIN FETCH c.post WHERE c.id = :id")
    Optional<Comment> findByIdWithPost(@Param("id") Long id);
}
