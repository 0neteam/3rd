import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/users/login', formData);

      // ✅ 헤더 안전하게 가져오기
      const authHeader = res.headers?.get
        ? res.headers.get('authorization')
        : res.headers['authorization'];

      if (!authHeader) throw new Error('토큰 없음');

      const token = authHeader.replace('Bearer ', '');
      localStorage.setItem('authToken', token);

      const userRes = await api.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const user = userRes.data;
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      console.error('❌ 로그인 실패:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        '이메일 또는 비밀번호를 확인해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>로그인</h2>
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>

      <a
        href="http://localhost:8081/oauth2/authorization/google"
        style={{
          marginTop: '10px',
          textAlign: 'center',
          backgroundColor: '#4285F4',
          color: '#fff',
          padding: '8px',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        구글 계정으로 로그인
      </a>

      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
