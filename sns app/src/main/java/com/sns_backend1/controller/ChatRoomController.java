// ✅ 리팩토링된 ChatRoomController.java
package com.sns_backend1.controller;

import com.sns_backend1.model.ChatRoom;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.ChatRoomRepository;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final UserService userService;

    @GetMapping("/list")
    public ResponseEntity<List<ChatRoom>> getMyChatRooms(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        List<ChatRoom> rooms = chatRoomRepository.findAll().stream()
                .filter(room ->
                        room.getUser1().getId().equals(currentUser.getId()) ||
                        room.getUser2().getId().equals(currentUser.getId())
                )
                .toList();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/findOrCreate")
    public ResponseEntity<ChatRoom> findOrCreateChatRoom(@AuthenticationPrincipal UserDetails userDetails,
                                                         @RequestParam Long userId) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        User otherUser = userService.getUserById(userId);

        ChatRoom chatRoom = chatRoomRepository.findByUser1AndUser2(currentUser, otherUser)
                .or(() -> chatRoomRepository.findByUser2AndUser1(currentUser, otherUser))
                .orElseGet(() -> {
                    ChatRoom newRoom = new ChatRoom();
                    newRoom.setUser1(currentUser);
                    newRoom.setUser2(otherUser);
                    return chatRoomRepository.save(newRoom);
                });

        return ResponseEntity.ok(chatRoom);
    }
}
