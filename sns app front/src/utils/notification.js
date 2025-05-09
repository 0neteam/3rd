// src/utils/notification.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (userId, onMessage) => {
  const token = localStorage.getItem("authToken");
  const WS_ENDPOINT = process.env.REACT_APP_WS_URL || "http://localhost:8081/ws";

  const socket = new SockJS(WS_ENDPOINT);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log("[STOMP DEBUG]", str),
  });

  stompClient.onConnect = () => {
    console.log("✅ WebSocket 연결 성공");

    stompClient.subscribe(`/topic/notifications/${userId}`, (msg) => {
      const data = JSON.parse(msg.body);
      console.log("🔔 알림:", data);
      onMessage?.(data);
    });

    stompClient.subscribe(`/topic/dm/${userId}`, (msg) => {
      const data = JSON.parse(msg.body);
      console.log("💬 DM 수신:", data);
      onMessage?.(data);
    });
  };

  stompClient.onStompError = (frame) => {
    console.error("❌ STOMP 오류:", frame.headers["message"], frame.body);
  };

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("🛑 WebSocket 연결 해제됨");
  }
};
