// ✅ 수정된 OAuthController.java
package com.sns_backend1.controller;

import com.sns_backend1.model.User;
import com.sns_backend1.security.JwtUtil;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/success")
    public void oauthLoginSuccess(@AuthenticationPrincipal OAuth2User oauthUser,
                                   HttpServletResponse response) throws IOException {
        if (oauthUser == null) {
            log.error("❌ OAuth2User가 null입니다. 인증이 완료되지 않았습니다.");
            response.sendRedirect("http://localhost:3000/login?error=oauth_null_user");
            return;
        }

        String email = oauthUser.getAttribute("email");
        String username = oauthUser.getAttribute("name");

        log.info("✅ 구글 로그인 성공 → email: {}, name: {}", email, username);

        User user = userService.findByEmail(email);
        if (user == null) {
            user = userService.registerOauthUser(email, username);
        }

        String token = jwtUtil.generateTokenWithRoles(email, List.of("ROLE_" + user.getRole().name()));
        String redirectUrl = "http://localhost:3000/oauth/redirect?token=" + token;
        response.sendRedirect(redirectUrl);
    }
}