package com.sns_backend1.service;

import com.sns_backend1.model.ChatRoom;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> findChatRoomsByUser(User user) {
        return chatRoomRepository.findByUser1OrUser2(user, user);
    }
}
