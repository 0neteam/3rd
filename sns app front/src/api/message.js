// 📁 src/api/message.js
import api from "./api";

// 메시지 전송 (텍스트 + 이미지 포함)
export const sendMessage = async (receiverId, content, image) => {
  const formData = new FormData();
  formData.append("receiverId", receiverId);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const res = await api.post("/api/messages/send", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// 특정 채팅방의 메시지 불러오기
export const getChatMessages = async (chatRoomId) => {
  const res = await api.get(`/api/messages/chatroom/${chatRoomId}`);
  return res.data;
};
