package com.sns_backend1.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
    private String token;
    private String refreshToken;
    private String username;
    private String message;

    private AuthResponse() {}

    public static AuthResponse success(String token, String refreshToken, String username) {
        AuthResponse response = new AuthResponse();
        response.token = token;
        response.refreshToken = refreshToken;
        response.username = username;
        return response;
    }

    public static AuthResponse message(String message) {
        AuthResponse response = new AuthResponse();
        response.message = message;
        return response;
    }
}