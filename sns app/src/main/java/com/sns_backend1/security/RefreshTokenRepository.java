package com.sns_backend1.security;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenAndUsedFalse(String token); // 사용되지 않은 토큰 조회
    void deleteByUsername(String username);
}