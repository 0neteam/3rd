// frontend/src/components/TestWebSocket.js
import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const TestWebSocket = ({ userId }) => {
  useEffect(() => {
    const socket = new SockJS(process.env.REACT_APP_WS_URL || "http://localhost:8081/ws");
    const stompClient = new Client({ webSocketFactory: () => socket });

    stompClient.onConnect = () => {
      console.log("✅ WebSocket 연결 성공");

      stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        console.log("📨 수신한 메시지:", message.body);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP 오류 발생:", frame.headers['message']);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log("❌ WebSocket 연결 종료");
    };
  }, [userId]);

  return <div>🧪 WebSocket 테스트 중... 콘솔 로그를 확인하세요!</div>;
};

export default TestWebSocket;
