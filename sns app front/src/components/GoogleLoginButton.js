// src/components/GoogleLoginButton.js
import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px' }}>
      Google 계정으로 로그인
    </button>
  );
};

export default GoogleLoginButton;
