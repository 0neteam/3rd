package com.java.cafe.config;

//import org.springframework.beans.factory.annotation.Value;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(RsaKeyProperties.class)
public class SecurityConfig {

//  @Value("${jwt.keys-uri}")
//  private String jwkSetURI;

//  @Bean
//  public JwtDecoder jwtDecoder() {
//    return NimbusJwtDecoder.withJwkSetUri(jwkSetURI).build();
//  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable);
    http.cors(AbstractHttpConfigurer::disable);
//    http.cors(Customizer.withDefaults());
//    http.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//    http.oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));
    http.authorizeHttpRequests(r -> {
//      r.requestMatchers(HttpMethod.GET,"/**").permitAll();
//      r.requestMatchers(HttpMethod.POST,"/**").permitAll();
//      r.requestMatchers("/docs","/v3/**","/swagger-ui/**").permitAll();
      r.anyRequest().permitAll();
//      r.anyRequest().authenticated();
    });
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    List<String> originUris = List.of("http://127.0.0.1:8000", "http://localhost:8000");
    originUris.forEach(config::addAllowedOrigin);
    config.addAllowedOriginPattern("*");
    config.addAllowedHeader("*");
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  private final RsaKeyProperties rsaKeys;

  // JWT 디코더 설정
  @Bean
  public JwtDecoder jwtDecoder() {
    // 공개 키를 사용하여 JWK를 생성
    RSAKey jwk = new RSAKey.Builder(rsaKeys.publicKey())
            .keyID("public-key-id")
            .build();

    // JWKSet 생성
    JWKSet jwkSet = new JWKSet(jwk);

    // JWKSource로 감싸기
    JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(jwkSet);

    // JWSKeySelector를 사용하여 JWTProcessor 설정
    JWSKeySelector<SecurityContext> jwsKeySelector = new JWSVerificationKeySelector<>(Set.of(JWSAlgorithm.RS256), jwkSource);
    DefaultJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
    jwtProcessor.setJWSKeySelector(jwsKeySelector);

    // JWTProcessor를 사용하여 NimbusJwtDecoder 반환
    return new NimbusJwtDecoder(jwtProcessor);
  }

  @Bean
  public JWKSet jwkSet() {
    RSAKey.Builder builder = new RSAKey.Builder(rsaKeys.publicKey())
            .keyUse(KeyUse.SIGNATURE)  // 서명 용도로 사용
            .algorithm(JWSAlgorithm.RS256)  // 서명 알고리즘 설정
            .keyID("public-key-id");  // 키 ID 설정
    return new JWKSet(builder.build());  // JWKSet 반환
  }

}
