import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/user/register', { username, password });
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login'); // 자동 로그인 말고 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('회원가입 실패');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">회원가입</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button className="btn btn-success" onClick={handleRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
