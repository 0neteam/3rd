package com.sns_backend1.security;

import com.sns_backend1.model.User;
import com.sns_backend1.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public OAuth2AuthenticationSuccessHandler(@Lazy UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                         Authentication authentication) throws IOException, ServletException {

        log.info("✅ OAuth2AuthenticationSuccessHandler 작동 시작");

        if (authentication.getPrincipal() instanceof OAuth2User oAuth2User) {
            String email = oAuth2User.getAttribute("email");
            String username = oAuth2User.getAttribute("name");

            log.info("✅ 로그인 사용자: email={}, username={}", email, username);

            // 유저 존재 여부 확인 후 등록
            User user = userService.findByEmail(email);
            if (user == null) {
                user = userService.registerOauthUser(email, username);
            }

            // JWT 발급
            String token = jwtUtil.generateTokenWithRoles(email, List.of("ROLE_" + user.getRole().name()));

            // ✅ username 한글 URL 인코딩 처리
            String encodedUsername = URLEncoder.encode(user.getUsername(), StandardCharsets.UTF_8);

            // ✅ 수정된 리디렉션 URL
            String redirectUrl = "http://localhost:3000/oauth/redirect?token=" + token + "&username=" + encodedUsername;

            log.info("✅ 리디렉션 URL (인코딩 완료): {}", redirectUrl);

            response.sendRedirect(redirectUrl);
        } else {
            log.error("❌ OAuth2User 객체 아님. 인증 실패.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "OAuth 인증 실패");
        }
    }
}
