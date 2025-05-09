import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const NavigationBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isDark = document.body.classList.contains('dark');

  return (
    <nav
      style={{
        padding: '10px',
        backgroundColor: isDark ? '#1f1f1f' : '#f8f9fa',
        borderBottom: `1px solid ${isDark ? '#333' : '#dee2e6'}`,
        color: isDark ? '#f0f0f0' : '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            marginRight: '15px',
            textDecoration: 'none',
            color: isDark ? '#90caf9' : '#007bff'
          }}
        >
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <span style={{ marginRight: '10px' }}>
              <strong>{user?.username}</strong>님 환영합니다!
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#dc3545',
                color: 'white',
                marginRight: '10px'
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginRight: '10px',
                textDecoration: 'none',
                color: isDark ? '#66bb6a' : '#28a745'
              }}
            >
              로그인
            </Link>
            <Link
              to="/signup"
              style={{
                marginRight: '10px',
                textDecoration: 'none',
                color: isDark ? '#90caf9' : '#007bff'
              }}
            >
              회원 가입
            </Link>
          </>
        )}

        <Link
          to="/profile"
          style={{
            marginRight: '15px',
            textDecoration: 'none',
            color: isDark ? '#f0f0f0' : '#000'
          }}
        >
          프로필
        </Link>
        <Link
          to="/messages"
          style={{
            marginRight: '15px',
            textDecoration: 'none',
            color: isDark ? '#f0f0f0' : '#000'
          }}
        >
          메시지
        </Link>
      </div>

      <DarkModeToggle />
    </nav>
  );
};

export default NavigationBar;
