package com.sns_backend1.security;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}