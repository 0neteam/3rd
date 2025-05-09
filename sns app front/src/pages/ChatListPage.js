import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      api.get("/api/chatroom/list")
        .then((res) => setChatRooms(res.data))
        .catch((err) => console.error("❌ 채팅방 목록 불러오기 실패:", err));
    }
  }, [user]);

  const getPartner = (chatRoom) => {
    if (!chatRoom?.user1 || !chatRoom?.user2) return null;
    return chatRoom.user1.id === user.id ? chatRoom.user2 : chatRoom.user1;
  };

  const isDark = document.body.classList.contains("dark");

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>📨 내 채팅방</h2>
      {chatRooms.length === 0 ? (
        <p style={{ color: isDark ? "#bbb" : "#666" }}>채팅방이 없습니다.</p>
      ) : (
        chatRooms.map((room) => {
          const partner = getPartner(room);
          if (!partner) return null;

          return (
            <div
              key={room.id}
              style={{
                padding: "10px",
                borderBottom: `1px solid ${isDark ? "#555" : "#ccc"}`,
                cursor: "pointer",
                background: isDark ? "#2c2c2c" : "#f9f9f9",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
              onClick={() => navigate(`/chat/${partner.id}`)}
            >
              <strong>{partner.username}</strong> 님과의 대화
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatListPage;
