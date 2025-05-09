import React, { useEffect, useState } from "react";
import api from "../services/api";
import { connectWebSocket } from "../utils/notification"; // ✅ 여기선 connectWebSocket만
import { requestNotificationPermission, showBrowserNotification } from "../services/notificationHelper";


const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("알림 불러오기 실패:", err);
      }
    };

    fetchNotifications();
    requestNotificationPermission();

    const stompClient = connectWebSocket((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showBrowserNotification("새 알림", notification.message);
    });

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔔 내 알림</h2>
      {notifications.length > 0 ? (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {notifications.map((n) => (
            <li key={n.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
              <div><strong>{n.message}</strong></div>
              <div style={{ fontSize: "0.8em", color: "#666" }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>📭 알림이 없습니다.</p>
      )}
    </div>
  );
};

export default NotificationPage;
