import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export let stompClient = null;
let connectionPromise = null;
let subscriptions = {}; // ✅ 중복 구독 방지용

export const setupWebSocket = (userId, onNotification, onDM) => {
  const token = localStorage.getItem("authToken");
  if (!token || !userId) {
    console.warn("❗ WebSocket 연결 실패: 토큰 또는 userId 없음");
    return;
  }

  // 기존 연결 종료
  if (stompClient && stompClient.connected) {
    console.log("♻️ 기존 stompClient 연결 해제");
    stompClient.deactivate();
    subscriptions = {};
  }

  let resolveFn, rejectFn;
  connectionPromise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    debug: (msg) => console.log("[STOMP DEBUG]", msg),
    onConnect: () => {
      console.log("✅ stomp 연결 성공");
      resolveFn();

      try {
        // 🔔 알림 구독
        const notiTopic = `/topic/notifications/${userId}`;
        if (!subscriptions[notiTopic]) {
          stompClient.subscribe(notiTopic, (msg) => {
            const parsed = JSON.parse(msg.body);
            if (onNotification) onNotification(parsed);
          });
          subscriptions[notiTopic] = true;
        }

        // 💬 DM 구독
        const dmTopic = `/topic/dm/${userId}`;
        if (!subscriptions[dmTopic]) {
          stompClient.subscribe(dmTopic, (msg) => {
            const parsed = JSON.parse(msg.body);
            if (onDM) onDM(parsed);
          });
          subscriptions[dmTopic] = true;
        }
      } catch (err) {
        console.error("❗ stomp 구독 실패:", err);
      }
    },
    onStompError: (frame) => {
      console.error("❗ STOMP 오류:", frame.headers["message"]);
      rejectFn(new Error("stomp 연결 실패"));
    },
    onWebSocketClose: () => {
      console.warn("⚠️ WebSocket 연결 종료됨");
    },
    onWebSocketError: (err) => {
      console.error("❌ WebSocket 에러:", err);
      rejectFn(new Error("WebSocket 에러"));
    },
  });

  stompClient.activate();
};

export const waitForStompConnection = async () => {
  if (!connectionPromise) {
    throw new Error("❗ stompClient가 초기화되지 않았습니다.");
  }
  return connectionPromise;
};

export const disconnectWebSocket = () => {
  if (stompClient && typeof stompClient.deactivate === "function") {
    stompClient.deactivate();
    stompClient = null;
    connectionPromise = null;
    subscriptions = {};
    console.log("🛑 stomp 연결 해제");
  }
};
