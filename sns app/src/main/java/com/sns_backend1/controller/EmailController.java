package com.sns_backend1.controller;

import com.sns_backend1.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> send(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        emailService.sendVerificationEmail(email);
        return ResponseEntity.ok(Map.of("message", "인증 코드 전송 완료"));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verify(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        boolean result = emailService.verifyCode(email, code);
        return ResponseEntity.ok(Map.of("verified", result));
    }
}
