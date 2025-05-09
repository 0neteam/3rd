package com.sns_backend1.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @PostMapping("/api/auth/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshToken -> {
                    if (refreshTokenService.isRefreshTokenExpired(refreshToken)) {
                        Map<String, String> errorResponse = new HashMap<>();
                        errorResponse.put("message", "Refresh token has expired. Please log in again.");
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
                    }
                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshToken.getUsername());
                    List<GrantedAuthority> authorities = userDetails.getAuthorities().stream().collect(Collectors.toList());
                    String newAccessToken = jwtUtil.generateAccessToken(userDetails.getUsername(), authorities);
                    refreshTokenService.markRefreshTokenAsUsed(refreshToken);
                    return ResponseEntity.ok(new RefreshTokenResponse(newAccessToken, null));
                })
                .orElseGet(() -> {
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("message", "Refresh token is invalid or already used.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
                });
    }
}