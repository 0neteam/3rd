import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import OAuthRedirectPage from './pages/OAuthRedirectPage';
import ProfilePage from './pages/ProfilePage';
import NotificationPage from './pages/NotificationPage';
import ChatPage from './pages/ChatPage';
import ChatListPage from './pages/ChatListPage';
import SearchUserPage from './pages/SearchUserPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import NavigationBar from './components/NavigationBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DMListPage from './pages/DMListPage';
import SettingsPage from './pages/SettingsPage';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function ChatPageWrapper() {
  const { receiverId } = useParams();
  const { currentUser } = useAuth();
  return <ChatPage receiverId={receiverId} currentUser={currentUser} />;
}

function AppRoutes() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <NavigationBar />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />

              <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><SearchUserPage /></PrivateRoute>} />
              <Route path="/notifications" element={<PrivateRoute><NotificationPage /></PrivateRoute>} />
              <Route path="/chat/:receiverId" element={<PrivateRoute><ChatPageWrapper /></PrivateRoute>} />
              <Route path="/chats" element={<PrivateRoute><ChatListPage /></PrivateRoute>} />
              <Route path="/messages" element={<PrivateRoute><DMListPage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            </Routes>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
          </div>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default AppRoutes;
