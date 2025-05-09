// 📁 src/pages/ChatPage.js
import React, { useEffect, useState, useRef } from "react";
import { setupWebSocket, disconnectWebSocket } from "../services/socket";
import api from "../services/api";

const ChatPage = ({ currentUser, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    setupWebSocket(currentUser.id, null, (dm) => {
      if (dm.senderId === receiverId || dm.receiverId === receiverId) {
        setMessages((prev) => [...prev, { ...dm, sender: { id: dm.senderId } }]);
      }
    });

    api.get(`/api/chatroom/findOrCreate?userId=${receiverId}`).then((res) => {
      setChatRoomId(res.data.id);
      return api.get(`/api/messages/chatroom/${res.data.id}`);
    }).then((res) => setMessages(res.data))
      .catch((err) => console.error("❌ 채팅방 정보 불러오기 실패:", err));

    return () => disconnectWebSocket();
  }, [receiverId, currentUser?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("receiverId", receiverId);
    formData.append("content", content);
    if (image) formData.append("file", image);

    try {
      const res = await api.post("/api/messages/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessages((prev) => [...prev, res.data]);
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("❌ 메시지 전송 실패:", err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <div
        ref={scrollRef}
        style={{ height: 400, overflowY: "scroll", border: "1px solid #ccc", padding: 10 }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender?.id === currentUser.id ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            {msg.imageUrl && (
              <img
                src={msg.imageUrl}
                alt="첨부 이미지"
                style={{ maxWidth: "200px", borderRadius: 8, marginBottom: 4 }}
              />
            )}
            <div>{msg.content}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="메시지를 입력하세요"
          style={{ flex: 1, padding: 8 }}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default ChatPage;