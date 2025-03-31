package com.java.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Bean
    SecurityFilterChain secFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(req -> {
                    //req.anyRequest().permitAll();
                    req.requestMatchers("/docs", "v3/**", "swagger-ui/**").permitAll();
                    req.anyRequest().authenticated();
                }
        );

        return http.build();
    }
}
