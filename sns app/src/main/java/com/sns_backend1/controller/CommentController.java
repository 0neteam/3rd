package com.sns_backend1.controller;

import com.sns_backend1.dto.CommentDto;
import com.sns_backend1.model.Comment;
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

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final LikeService likeService;
    private final UserService userService;

    // ✅ 댓글 작성 (CommentDto 반환)
    @PostMapping("/{postId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long postId,
                                                    @RequestParam String content,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        Comment comment = commentService.addComment(postId, content, userDetails.getUsername());
        User currentUser = userService.findByEmail(userDetails.getUsername());

        CommentDto dto = CommentDto.builder()
                .id(comment.getId())
                .userId(currentUser.getId())
                .username(currentUser.getUsername())
                .content(comment.getContent())
                .isMine(true)
                .isLiked(false)
                .likeCount(0)
                .createdAt(comment.getCreatedAt())
                .build();

        return ResponseEntity.ok(dto);
    }

    // ✅ 댓글 목록 조회
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        List<Comment> comments = postService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // ✅ 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId,
                                              @AuthenticationPrincipal UserDetails userDetails) {
        postService.deleteComment(commentId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    // ✅ 댓글 좋아요
    @PostMapping("/{commentId}/like")
    public ResponseEntity<Map<String, Object>> likeComment(@PathVariable Long commentId,
                                                           @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        Comment comment = commentService.findById(commentId);
        likeService.likeComment(user, comment);

        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(comment));
        response.put("message", "댓글 좋아요 성공");

        return ResponseEntity.ok(response);
    }

    // ✅ 댓글 좋아요 취소
    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<Map<String, Object>> unlikeComment(@PathVariable Long commentId,
                                                             @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        Comment comment = commentService.findById(commentId);
        likeService.unlikeComment(user, comment);

        Map<String, Object> response = new HashMap<>();
        response.put("likeCount", likeService.countLikes(comment));
        response.put("message", "댓글 좋아요 취소 완료");

        return ResponseEntity.ok(response);
    }

    // ✅ 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable Long commentId,
                                              @RequestParam String content,
                                              @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        commentService.updateComment(commentId, content, user);
        return ResponseEntity.ok().build();
    }
}
