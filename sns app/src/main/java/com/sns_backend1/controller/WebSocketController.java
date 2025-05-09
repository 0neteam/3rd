package com.sns_backend1.controller;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    @MessageMapping("/ping")
    public void ping(SimpMessageHeaderAccessor accessor) {
        String email = (String) accessor.getSessionAttributes().get("email");
        System.out.println("📨 WebSocket 핑! 사용자: " + email);
    }
}
