import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import connectWebSocket from "../services/connectWebSocket";
import { showBrowserNotification } from "../services/notificationHelper";

function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [dmCount, setDmCount] = useState(0);
  const isDark = document.body.classList.contains("dark");

  useEffect(() => {
    const stompClient = connectWebSocket(
      (notification) => {
        setNotificationCount((prev) => prev + 1);
        showBrowserNotification("🔔 새 알림", notification.message);
      },
      (dm) => {
        setDmCount((prev) => prev + 1);
        showBrowserNotification("💬 새 DM", dm.message);
      }
    );

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <nav
      style={{
        padding: "10px",
        backgroundColor: isDark ? "#1f1f1f" : "#eee",
        color: isDark ? "#f0f0f0" : "#000",
        borderBottom: `1px solid ${isDark ? "#333" : "#ccc"}`
      }}
    >
      <Link to="/" style={{ color: isDark ? "#90caf9" : "#000", marginRight: 10 }}>🏠 홈</Link>
      <Link to="/login" style={{ color: isDark ? "#66bb6a" : "#28a745", marginRight: 10 }}>로그인</Link>
      <Link to="/register" style={{ color: isDark ? "#90caf9" : "#007bff", marginRight: 10 }}>회원가입</Link>
      <Link to="/search" style={{ color: isDark ? "#ffa726" : "#000", marginRight: 10 }}>🔍 검색</Link>

      <Link to="/notifications" style={{ position: "relative", marginRight: 10, color: isDark ? "#f0f0f0" : "#000" }}>
        🔔 알림
        {notificationCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 7px",
            fontSize: "12px"
          }}>
            {notificationCount}
          </span>
        )}
      </Link>

      <Link to="/chats" style={{ position: "relative", color: isDark ? "#f0f0f0" : "#000" }}>
        💬 DM
        {dmCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "blue",
            color: "white",
            borderRadius: "50%",
            padding: "4px 7px",
            fontSize: "12px"
          }}>
            {dmCount}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
