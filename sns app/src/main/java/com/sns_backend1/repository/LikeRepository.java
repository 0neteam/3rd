package com.sns_backend1.repository;

import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Like;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndPost(User user, Post post);
    Optional<Like> findByUserAndComment(User user, Comment comment);
    int countByPost(Post post);
    int countByComment(Comment comment);
}
