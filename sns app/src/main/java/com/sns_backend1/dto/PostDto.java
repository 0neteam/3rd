package com.sns_backend1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private Long id;
    private Long userId;
    private String username;
    private String userProfileImageUrl;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int commentCount;
    private boolean isLiked;

    @JsonProperty("isMine")
    private boolean isMine;

    private List<CommentDto> comments;
    private LocalDateTime createdAt;
}
