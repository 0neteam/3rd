package com.sns_backend1.service;

import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Like;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final NotificationService notificationService;

    @Transactional
    public void likePost(User user, Post post) {
        likeRepository.findByUserAndPost(user, post)
            .ifPresentOrElse(like -> {}, () -> {
                Like like = new Like(user, post);
                likeRepository.save(like);

                if (!user.getId().equals(post.getUser().getId())) {
                    notificationService.sendNotification(
                        post.getUser(),
                        user.getUsername() + "님이 게시글에 좋아요를 눌렀습니다."
                    );
                }
            });
    }

    @Transactional
    public void unlikePost(User user, Post post) {
        likeRepository.findByUserAndPost(user, post)
            .ifPresent(likeRepository::delete);
    }

    public int countLikes(Post post) {
        return likeRepository.countByPost(post);
    }

    public boolean isUserLiked(User user, Post post) {
        return likeRepository.findByUserAndPost(user, post).isPresent();
    }

    @Transactional
    public void likeComment(User user, Comment comment) {
        likeRepository.findByUserAndComment(user, comment)
            .ifPresentOrElse(like -> {}, () -> {
                Like like = new Like(user, comment);
                likeRepository.save(like);

                if (!user.getId().equals(comment.getUser().getId())) {
                    notificationService.sendNotification(
                        comment.getUser(),
                        user.getUsername() + "님이 댓글에 좋아요를 눌렀습니다."
                    );
                }
            });
    }

    @Transactional
    public void unlikeComment(User user, Comment comment) {
        likeRepository.findByUserAndComment(user, comment)
            .ifPresent(likeRepository::delete);
    }

    public int countLikes(Comment comment) {
        return likeRepository.countByComment(comment);
    }

    public boolean isUserLiked(User user, Comment comment) {
        return likeRepository.findByUserAndComment(user, comment).isPresent();
    }
}
