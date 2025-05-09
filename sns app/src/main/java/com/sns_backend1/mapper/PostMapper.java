// ✅ src/main/java/com/sns_backend1/mapper/PostMapper.java
package com.sns_backend1.mapper;

import com.sns_backend1.dto.CommentDto;
import com.sns_backend1.dto.PostDto;
import com.sns_backend1.model.Post;
import com.sns_backend1.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper {
    public PostDto toDto(Post post, User currentUser, List<CommentDto> comments) {
        return PostDto.builder()
                .id(post.getId())
                .userId(post.getUser().getId())
                .username(post.getUser().getUsername())
                .userProfileImageUrl(post.getUser().getProfileImageUrl())
                .content(post.getContent())
                .imageUrl(post.getImageUrl())
                .likeCount(post.getLikes() != null ? post.getLikes().size() : 0)
                .commentCount(post.getComments() != null ? post.getComments().size() : 0)
                .isLiked(post.getLikes().stream().anyMatch(like -> like.getUser().equals(currentUser)))
                .isMine(post.getUser().equals(currentUser))
                .comments(comments)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
