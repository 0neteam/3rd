// ✅ PostDto 적용 전체 리팩토리된 완료본
// 파일: com.sns_backend1.controller.PostController
package com.sns_backend1.controller;

import com.sns_backend1.dto.PostDto;
import com.sns_backend1.model.User;
import com.sns_backend1.service.ImageUploadService;
import com.sns_backend1.service.PostService;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PostController {
    private final PostService postService;
    private final UserService userService;
    private final ImageUploadService imageUploadService;
    private final Logger logger = LoggerFactory.getLogger(PostController.class);

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<PostDto> createPost(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestPart("content") String content,
                                              @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            User user = userService.findByEmail(userDetails.getUsername());
            String imageUrl = imageUploadService.uploadImage(image);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(postService.createPostDto(user, content, imageUrl));
        } catch (Exception e) {
            logger.error("게시글 작성 중 오류 발생", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 작성 실패");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getPostsByUser(@PathVariable Long userId,
                                                        @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        List<PostDto> posts = postService.getPostDtosByUserId(userId, currentUser);
        return ResponseEntity.ok(posts);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        List<PostDto> posts = postService.getAllPostDtos(currentUser);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(postService.getPostDtoById(id, currentUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long id) {
        User user = userService.findByEmail(userDetails.getUsername());
        postService.deletePost(id, user);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<PostDto> updatePost(@AuthenticationPrincipal UserDetails userDetails,
                                              @PathVariable Long id,
                                              @RequestPart("content") String content,
                                              @RequestPart(value = "image", required = false) MultipartFile image) {
        User user = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(postService.updatePostDto(id, content, image, user));
    }
}
