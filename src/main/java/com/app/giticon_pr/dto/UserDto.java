package com.app.giticon_pr.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;     // ✅ 이메일 추가
    private String password;
}
