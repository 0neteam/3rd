package com.sns_backend1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
    private Long id;
    private String content;
    private String username;
    private Long userId;

    @JsonProperty("isMine")
    private boolean isMine;

    private boolean isLiked;
    private int likeCount;
    private LocalDateTime createdAt;
}
