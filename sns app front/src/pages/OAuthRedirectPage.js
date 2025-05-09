import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const { updateAuthToken, updateUser } = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      console.error('❌ 토큰 없음. 로그인 페이지로 이동');
      navigate('/login');
      return;
    }

    console.log('✅ 받은 토큰:', token);
    localStorage.setItem('authToken', token); // ✅ 백엔드와 통일된 키
    updateAuthToken(token);

    fetch('http://localhost:8081/api/users/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('사용자 정보를 불러오지 못했습니다.');
        return res.json();
      })
      .then(data => {
        console.log('✅ 유저 정보:', data);

        // ✅ userId와 username을 localStorage에 저장
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username);

        updateUser(data);
        navigate('/');
      })
      .catch(err => {
        console.error('❌ 사용자 정보 요청 실패:', err);
        navigate('/login');
      });
  }, [navigate, updateAuthToken, updateUser]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '80px', fontSize: '18px' }}>
      🔐 로그인 처리 중입니다... 잠시만 기다려주세요.
    </div>
  );
};

export default OAuthRedirectPage;
