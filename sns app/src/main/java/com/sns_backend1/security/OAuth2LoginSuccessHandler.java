package com.sns_backend1.security;

import com.sns_backend1.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        String email = authentication.getName(); // 이메일 추출
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        List<GrantedAuthority> authorities = (List<GrantedAuthority>) userDetails.getAuthorities();
        String accessToken = jwtUtil.generateAccessToken(email, authorities);

        // 🔒 쿼리 파라미터로 보내는 경우 반드시 인코딩 필요
        String encodedToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8);

        // 프론트엔드로 리디렉션 (예: React 앱)
        response.sendRedirect("http://localhost:3000/oauth-success?token=" + encodedToken);
    }
}
