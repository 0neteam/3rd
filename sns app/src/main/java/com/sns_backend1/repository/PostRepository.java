package com.sns_backend1.repository;

import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);
    List<Post> findByUserId(Long userId);

    // 🔁 전체 게시글 조회 시: 사용자, 댓글, 댓글 작성자까지 모두 fetch
    @Query("SELECT DISTINCT p FROM Post p " +
           "LEFT JOIN FETCH p.user " +
           "LEFT JOIN FETCH p.comments c " +
           "LEFT JOIN FETCH c.user")
    List<Post> findAllWithUserAndComments();

    // 🔁 특정 유저의 게시글을 사용자/댓글/작성자까지 fetch
    @Query("SELECT DISTINCT p FROM Post p " +
           "LEFT JOIN FETCH p.user " +
           "LEFT JOIN FETCH p.comments c " +
           "LEFT JOIN FETCH c.user " +
           "WHERE p.user.id = :userId")
    List<Post> findByUserIdWithUser(@Param("userId") Long userId);

    // 🔁 게시글 상세 조회 시 댓글과 댓글 작성자까지 포함 (User도 포함)
    @Query("SELECT p FROM Post p " +
           "LEFT JOIN FETCH p.user " +
           "LEFT JOIN FETCH p.comments c " +
           "LEFT JOIN FETCH c.user " +
           "WHERE p.id = :postId")
    Optional<Post> findByIdWithUserAndComments(@Param("postId") Long postId);
}
