package com.sns_backend1.service;

import com.sns_backend1.dto.CommentDto;
import com.sns_backend1.dto.PostDto;
import com.sns_backend1.model.Comment;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.CommentRepository;
import com.sns_backend1.repository.PostRepository;
import com.sns_backend1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ImageUploadService imageUploadService;
    private final LikeService likeService;

    @Transactional
    public Post createPost(User user, String content, String imageUrl) {
        Post post = new Post(user, content);
        post.setImageUrl(imageUrl);
        return postRepository.save(post);
    }

    @Transactional
    public PostDto createPostDto(User user, String content, String imageUrl) {
        Post post = createPost(user, content, imageUrl);
        return toDto(post, user);
    }

    @Transactional
    public List<PostDto> getPostDtosByUserId(Long userId, User currentUser) {
        List<Post> posts = postRepository.findByUserIdWithUser(userId);
        return posts.stream()
                .map(post -> toDto(post, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional
    public Comment addComment(Long postId, String content, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 찾을 수 없습니다."));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Transactional
    public void deleteComment(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다."));

        if (!comment.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }

    public Post findById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));
    }

    public List<Post> getUserPosts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다."));
        return postRepository.findByUser(user);
    }

    public List<Post> getPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<PostDto> getAllPostDtos(User currentUser) {
        return postRepository.findAllWithUserAndComments().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())) // 최신순
                .map(post -> toDto(post, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional
    public Post updatePost(Long id, String content, String imageUrl) {
        Post post = findById(id);
        post.setContent(content);
        post.setImageUrl(imageUrl);
        return postRepository.save(post);
    }

    @Transactional
    public PostDto updatePostDto(Long postId, String content, MultipartFile image, User user) {
        Post post = findById(postId);
        if (!post.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 수정 권한이 없습니다.");
        }

        String imageUrl = post.getImageUrl(); // 기본값은 기존 이미지 유지

        if (image != null && !image.isEmpty()) {
            imageUrl = imageUploadService.uploadImage(image); // ✅ 수정됨
        }

        Post updated = updatePost(postId, content, imageUrl);
        return toDto(updated, user);
    }

    @Transactional
    public void deletePost(Long postId, User currentUser) {
        Post post = findById(postId);
        boolean isOwner = post.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole().name().equals("ROLE_ADMIN");

        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 삭제 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    public PostDto getPostDtoById(Long postId, User currentUser) {
        Post post = postRepository.findByIdWithUserAndComments(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));
        return toDto(post, currentUser);
    }

    public PostDto toDto(Post post, User currentUser) {
        return PostDto.builder()
                .id(post.getId())
                .userId(post.getUser().getId())
                .username(post.getUser().getUsername())
                .userProfileImageUrl(post.getUser().getProfileImageUrl())
                .content(post.getContent())
                .imageUrl(post.getImageUrl())
                .likeCount(likeService.countLikes(post))
                .commentCount(post.getComments().size())
                .isLiked(likeService.isUserLiked(currentUser, post))
                .isMine(post.getUser().getId().equals(currentUser.getId()))
                .comments(post.getComments().stream()
                        .map(c -> mapCommentToDto(c, currentUser))
                        .collect(Collectors.toList()))
                .createdAt(post.getCreatedAt())
                .build();
    }

    private CommentDto mapCommentToDto(Comment comment, User currentUser) {
        return CommentDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .content(comment.getContent())
                .isMine(comment.getUser().getId().equals(currentUser.getId()))
                .isLiked(likeService.isUserLiked(currentUser, comment))
                .likeCount(likeService.countLikes(comment))
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
