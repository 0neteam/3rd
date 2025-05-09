import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { setupWebSocket } from "./services/socket";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import NotificationPage from "./pages/NotificationPage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const { isAuthenticated, user, setSocketReady } = useAuth(); // ✅ socketReady 제어 함수 추가

  useEffect(() => {
    const connectWS = async () => {
      if (isAuthenticated && user?.id) {
        try {
          await setupWebSocket(
            user.id,
            (notification) => console.log("🔔 알림:", notification),
            (dm) => console.log("📨 DM 수신:", dm)
          );
          setSocketReady(true); // ✅ 연결 성공 시 상태 설정
        } catch (e) {
          console.error("❌ WebSocket 연결 실패:", e);
          setSocketReady(false);
        }
      }
    };

    connectWS();
  }, [isAuthenticated, user, setSocketReady]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/chatrooms" element={<ChatListPage />} />
        <Route path="/chat/:receiverId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
