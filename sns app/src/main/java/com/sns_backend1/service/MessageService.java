package com.sns_backend1.service;

import com.sns_backend1.dto.MessageDto;
import com.sns_backend1.model.*;
import com.sns_backend1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;

    // ✅ 채팅방이 없으면 생성
    public ChatRoom findOrCreateChatRoom(User user1, User user2) {
        return chatRoomRepository.findByUser1AndUser2(user1, user2)
                .or(() -> chatRoomRepository.findByUser2AndUser1(user1, user2))
                .orElseGet(() -> {
                    ChatRoom chatRoom = new ChatRoom();
                    chatRoom.setUser1(user1);
                    chatRoom.setUser2(user2);
                    return chatRoomRepository.save(chatRoom);
                });
    }

    // ✅ 메시지 전송
    public Message sendMessage(User sender, Long receiverId, String content, String imageUrl) {
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("수신 유저를 찾을 수 없습니다."));

        ChatRoom chatRoom = findOrCreateChatRoom(sender, receiver);

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setImageUrl(imageUrl);
        message.setChatRoom(chatRoom);
        message.setTimestamp(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);

        // WebSocket 실시간 전송
        MessageDto messageDto = new MessageDto(
                savedMessage.getId(),
                sender.getId(),
                sender.getUsername(),
                receiver.getId(),
                savedMessage.getContent(),
                savedMessage.getImageUrl(),
                savedMessage.getTimestamp()
        );

        messagingTemplate.convertAndSend("/topic/dm/" + receiver.getId(), messageDto);
        notificationService.sendNotification(receiver, sender.getUsername() + "님이 쪽지를 보냈습니다.");

        return savedMessage;
    }

    // ✅ 채팅방 메시지 조회
    public List<Message> getChatMessages(Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방을 찾을 수 없습니다."));
        return messageRepository.findByChatRoomOrderByTimestampAsc(chatRoom);
    }

    // ✅ 유저가 주고받은 모든 메시지
    public List<Message> getMessagesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return messageRepository.findBySenderOrReceiver(user, user);
    }

    // ✅ 받은 메시지만
    public List<Message> getReceivedMessages(User user) {
        return messageRepository.findByReceiverOrderByTimestampDesc(user);
    }

    // ✅ 보낸 메시지만
    public List<Message> getSentMessages(User user) {
        return messageRepository.findBySenderOrderByTimestampDesc(user);
    }
}
