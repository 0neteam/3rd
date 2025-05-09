import { useEffect, useRef, useState } from "react";
import { stompClient, waitForStompConnection, setupWebSocket } from "../services/socket";
import api from "../services/api";

function DMModal({ receiver, onClose }) {
  const [myInfo, setMyInfo] = useState({ userId: null, username: null });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (!storedUserId || !storedUsername) {
      console.warn("❌ localStorage에 user 정보 없음");
      return;
    }

    setMyInfo({
      userId: parseInt(storedUserId),
      username: storedUsername,
    });
  }, []);

  useEffect(() => {
    if (!receiver?.id || !receiver.username || !myInfo.userId) return;

    const initChat = async () => {
      try {
        const res = await api.get(`/api/chatroom/findOrCreate?userId=${receiver.id}`);
        const roomId = res.data.id;
        const msgRes = await api.get(`/api/messages/chatroom/${roomId}`);
        setMessages(msgRes.data.map(m => ({ ...m, isMe: m.senderId !== receiver.id })));
      } catch (e) {
        console.error("❌ 채팅방 초기화 실패:", e);
      }
    };

    const connectAndSubscribe = async () => {
      try {
        if (!stompClient || !stompClient.connected) {
          console.warn("⚠️ stompClient 미연결 상태 - WebSocket 재시도");
          setupWebSocket(myInfo.userId);
          await waitForStompConnection();
        }

        const sub = stompClient.subscribe(`/topic/dm/${myInfo.userId}`, (msg) => {
          const parsed = JSON.parse(msg.body);
          if (parsed.senderUsername === receiver.username) {
            setMessages(prev => [...prev, { ...parsed, isMe: false }]);
          }
        });

        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => {
          sub.unsubscribe();
          window.removeEventListener("keydown", esc);
        };
      } catch (e) {
        console.error("❌ stomp 연결 실패:", e);
      }
    };

    initChat();
    connectAndSubscribe();
  }, [receiver.id, myInfo.userId]);

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    try {
      await waitForStompConnection();
      if (!stompClient || !stompClient.connected) {
        console.warn("❌ stompClient 연결 안됨, 메시지 전송 불가");
        return;
      }
    } catch (e) {
      console.warn("❌ stompClient 연결 대기 실패", e);
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      const form = new FormData();
      form.append("file", imageFile);
      try {
        const res = await api.post("/api/messages/image", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = res.data;
      } catch (e) {
        console.error("❌ 이미지 업로드 실패:", e);
      }
      setImageFile(null);
    }

    const dto = {
      senderId: myInfo.userId,
      senderUsername: myInfo.username,
      receiverId: receiver.id,
      content: input,
      imageUrl,
    };

    try {
      stompClient.send("/app/sendMessage", {}, JSON.stringify(dto));
      setMessages(prev => [...prev, { ...dto, isMe: true }]);
      setInput("");
    } catch (e) {
      console.error("❌ 메시지 전송 실패:", e);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const isDark = document.body.classList.contains("dark");

  if (!myInfo.userId || !myInfo.username) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        ❌ 로그인 정보가 없습니다. 페이지를 새로고침 하거나 다시 로그인해주세요.
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          background: isDark ? "#1e1e1e" : "#fff",
          color: isDark ? "#eee" : "#000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4>💬 {receiver.username} 님과의 대화</h4>
        <div
          ref={scrollRef}
          style={{
            ...styles.chatBox,
            background: isDark ? "#2a2a2a" : "#f4f4f4",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...m.isMe ? styles.myMessage : styles.otherMessage,
                backgroundColor: m.isMe
                  ? isDark ? "#0056b3" : "#e6f0ff"
                  : isDark ? "#444" : "#eaeaea",
                color: isDark ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "12px",
                marginBottom: "8px",
                maxWidth: "80%",
                alignSelf: m.isMe ? "flex-end" : "flex-start",
              }}
            >
              {m.content && <div>{m.content}</div>}
              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  alt="첨부"
                  style={{
                    maxWidth: "200px",
                    marginTop: "8px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="메시지 입력"
            style={{
              flex: 1,
              padding: "8px",
              background: isDark ? "#333" : "#fff",
              color: isDark ? "#eee" : "#000",
              border: `1px solid ${isDark ? "#555" : "#ccc"}`,
              borderRadius: "5px",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ width: "140px", fontSize: "12px" }}
          />
          <button onClick={handleSend}>전송</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 999,
  },
  modal: {
    width: "500px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    marginBottom: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  myMessage: { alignSelf: "flex-end", textAlign: "right" },
  otherMessage: { alignSelf: "flex-start", textAlign: "left" },
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
  },
};

export default DMModal;
