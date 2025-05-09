package com.sns_backend1.controller;

import com.sns_backend1.dto.MessageDto;
import com.sns_backend1.model.Message;
import com.sns_backend1.model.User;
import com.sns_backend1.service.MessageService;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    // ✅ WebSocket - 실시간 메시지 전송
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload MessageDto messageDto) {
        User sender = userService.getUserById(messageDto.getSenderId());
        messageService.sendMessage(sender, messageDto.getReceiverId(), messageDto.getContent(), messageDto.getImageUrl());
    }

    // ✅ REST - 채팅방 메시지 조회
    @GetMapping("/chatroom/{chatRoomId}")
    public ResponseEntity<List<Message>> getMessagesByChatRoom(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(messageService.getChatMessages(chatRoomId));
    }

    // ✅ REST - 유저가 주고받은 메시지 전체 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(messageService.getMessagesByUser(userId));
    }

    // ✅ REST - 받은 메시지 조회
    @GetMapping("/received")
    public ResponseEntity<List<Message>> getReceivedMessages(@AuthenticationPrincipal UserDetails userDetails) {
        User receiver = userService.getUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(messageService.getReceivedMessages(receiver));
    }

    // ✅ REST - 보낸 메시지 조회
    @GetMapping("/sent")
    public ResponseEntity<List<Message>> getSentMessages(@AuthenticationPrincipal UserDetails userDetails) {
        User sender = userService.getUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(messageService.getSentMessages(sender));
    }
}
