package com.sns_backend1.service;

import com.sns_backend1.model.Notification;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationSocketService notificationSocketService;

    @Transactional
    public void sendNotification(User receiver, String message) {
        Notification notification = new Notification(receiver, message);
        notificationRepository.save(notification);
    }

    @Transactional
    public void sendAndSaveNotification(User receiver, String message) {
        Notification notification = new Notification(receiver, message);
        notificationRepository.save(notification);
        notificationSocketService.sendNotification(receiver.getId(), notification);
    }

    public List<Notification> getNotifications(User receiver) {
        return notificationRepository.findByReceiverOrderByCreatedAtDesc(receiver);
    }
}
