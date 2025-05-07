// 📁 src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn, setUsername }) => {   // 🔥 setUsername 추가
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/user/login', { 
        username: usernameInput, 
        password 
      });

      // 🔥 로그인 성공 시
      localStorage.setItem('token', res.data.token); // 예시로 token 저장
      localStorage.setItem('username', usernameInput); // 🔥 username도 저장
      setIsLoggedIn(true);
      setUsername(usernameInput); // 🔥 App 상태에도 즉시 반영
      alert('로그인 성공!');
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">로그인</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="아이디"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button className="btn btn-primary" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
