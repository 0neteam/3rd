package com.sns_backend1.service;

import com.sns_backend1.model.EmailVerification;
import com.sns_backend1.repository.EmailVerificationRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailVerificationRepository repository;

    @Value("${spring.mail.username}")
    private String from;

    public String sendVerificationEmail(String email) {
        String code = generateCode();

        EmailVerification verification = new EmailVerification();
        verification.setEmail(email);
        verification.setCode(code);
        repository.save(verification);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setFrom(from);
            helper.setSubject("[SNS 사이트] 이메일 인증 코드");
            helper.setText("<h1>인증 코드: " + code + "</h1>", true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("메일 전송 실패: " + e.getMessage());
        }

        return code;
    }

    public boolean verifyCode(String email, String code) {
        Optional<EmailVerification> record = repository.findTopByEmailOrderByCreatedAtDesc(email);

        if (record.isPresent()) {
            System.out.println("✅ 서버 저장된 인증 코드: " + record.get().getCode());
            System.out.println("✅ 사용자가 입력한 인증 코드: " + code);

            if (record.get().getCode().equals(code)) {
                EmailVerification v = record.get();
                v.setVerified(true);
                repository.save(v);
                return true;
            }
        }
        return false;
    }

    private String generateCode() {
        Random random = new Random();
        int num = random.nextInt(900000) + 100000; // 6자리
        return String.valueOf(num);
    }
}
