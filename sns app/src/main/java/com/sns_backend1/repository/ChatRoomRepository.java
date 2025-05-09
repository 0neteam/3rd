package com.sns_backend1.repository;

import com.sns_backend1.model.ChatRoom;
import com.sns_backend1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 기존
    Optional<ChatRoom> findByUser1AndUser2(User user1, User user2);
    Optional<ChatRoom> findByUser2AndUser1(User user2, User user1);

    // ✅ 추가해야 할 메서드
    List<ChatRoom> findByUser1OrUser2(User user1, User user2);
}
