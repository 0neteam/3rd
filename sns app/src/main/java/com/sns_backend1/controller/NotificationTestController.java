package com.sns_backend1.controller;

import com.sns_backend1.dto.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class NotificationTestController {

    private final SimpMessagingTemplate messagingTemplate;

    // 개인 알림 테스트용 API
    @PostMapping("/user-notification")
    public void sendUserNotification(@RequestParam Long userId,
                                     @RequestParam String title,
                                     @RequestParam String content) {
        NotificationDto notification = new NotificationDto(title, content);
        messagingTemplate.convertAndSend("/topic/user/" + userId, notification);
    }

    // 공통 알림 테스트용 API
    @PostMapping("/broadcast")
    public void sendBroadcastNotification(@RequestParam String title,
                                          @RequestParam String content) {
        NotificationDto notification = new NotificationDto(title, content);
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }
}
