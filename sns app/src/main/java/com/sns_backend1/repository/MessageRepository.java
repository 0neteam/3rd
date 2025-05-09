package com.sns_backend1.repository;

import com.sns_backend1.model.Message;
import com.sns_backend1.model.ChatRoom;
import com.sns_backend1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderAndReceiver(User sender, User receiver);
    List<Message> findByReceiverAndSender(User receiver, User sender);
    List<Message> findBySenderAndReceiverOrReceiverAndSender(User sender, User receiver, User receiver2, User sender2);

    // ✅ 채팅방 기준 메시지 조회
    List<Message> findByChatRoomOrderByTimestampAsc(ChatRoom chatRoom);

    // ✅ 유저가 주고받은 모든 메시지
    List<Message> findBySenderOrReceiver(User sender, User receiver);

    // ✅ 받은 메시지 목록
    List<Message> findByReceiverOrderByTimestampDesc(User receiver);

    // ✅ 보낸 메시지 목록
    List<Message> findBySenderOrderByTimestampDesc(User sender);
}
