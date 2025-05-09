package com.sns_backend1.service;

import com.sns_backend1.dto.NotificationDto;
import com.sns_backend1.model.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotification(Long receiverId, Notification notification) {
        NotificationDto dto = new NotificationDto("알림", notification.getMessage());
        messagingTemplate.convertAndSend("/topic/notifications/" + receiverId, dto);
    }
}
