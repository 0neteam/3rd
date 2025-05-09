// 📁 src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService'; // ✅ 서비스 분리

const LoginPage = ({ setIsLoggedIn, setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await loginUser({ username: usernameInput, password });

    if (!res.success) {
      throw new Error("❌ 아이디 또는 비밀번호가 틀렸습니다.");
    }

    localStorage.setItem('token', res.token);
    localStorage.setItem('username', usernameInput);
    setIsLoggedIn(true);
    setUsername(usernameInput);
    alert('✅ 로그인 성공!');
    navigate('/');
  } catch (err) {
    alert(err.message);
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
