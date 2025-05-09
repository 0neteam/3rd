package com.sns_backend1.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${jwt.refresh.expiration.time}")
    private long refreshTokenExpirationTime;

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;

    public RefreshToken createRefreshToken(String username) {
        String refreshTokenString = jwtUtil.generateRefreshToken(username);
        LocalDateTime expiryDate = LocalDateTime.now().plusSeconds(refreshTokenExpirationTime / 1000);
        RefreshToken refreshToken = new RefreshToken(username, refreshTokenString, expiryDate);
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByTokenAndUsedFalse(token);
    }

    public boolean isRefreshTokenExpired(RefreshToken token) {
        return token.getExpiryDate().isBefore(LocalDateTime.now());
    }

    public void deleteByUsername(String username) {
        refreshTokenRepository.deleteByUsername(username);
    }

    public void markRefreshTokenAsUsed(RefreshToken token) {
        token.setUsed(true);
        refreshTokenRepository.save(token);
    }
}
