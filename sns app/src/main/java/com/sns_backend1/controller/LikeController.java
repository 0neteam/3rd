package com.sns_backend1.controller;

import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import com.sns_backend1.service.CommentService;
import com.sns_backend1.service.LikeService;
import com.sns_backend1.service.PostService;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;

    @PostMapping("/posts/{postId}")
    public ResponseEntity<Map<String, Object>> likePost(@AuthenticationPrincipal UserDetails userDetails,
                                                        @PathVariable Long postId) {
        User user = userService.findByEmail(userDetails.getUsername());
        Post post = postService.findById(postId);
        likeService.likePost(user, post);
        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(post));
        response.put("liked", true);
        response.put("message", "게시글 좋아요 성공");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Map<String, Object>> unlikePost(@AuthenticationPrincipal UserDetails userDetails,
                                                          @PathVariable Long postId) {
        User user = userService.findByEmail(userDetails.getUsername());
        Post post = postService.findById(postId);
        likeService.unlikePost(user, post);
        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(post));
        response.put("liked", false);
        response.put("message", "게시글 좋아요 취소");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/comments/{commentId}")
    public ResponseEntity<Map<String, Object>> likeComment(@AuthenticationPrincipal UserDetails userDetails,
                                                           @PathVariable Long commentId) {
        User user = userService.findByEmail(userDetails.getUsername());
        // ✅ comment와 post를 함께 fetch해서 가져와야 DB 제약조건 위반 안 남
        Comment comment = commentService.findByIdWithPost(commentId);
        likeService.likeComment(user, comment);
        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(comment));
        response.put("liked", true);
        response.put("message", "댓글 좋아요 성공");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Map<String, Object>> unlikeComment(@AuthenticationPrincipal UserDetails userDetails,
                                                             @PathVariable Long commentId) {
        User user = userService.findByEmail(userDetails.getUsername());
        Comment comment = commentService.findByIdWithPost(commentId);
        likeService.unlikeComment(user, comment);
        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(comment));
        response.put("liked", false);
        response.put("message", "댓글 좋아요 취소");
        return ResponseEntity.ok(response);
    }
}
