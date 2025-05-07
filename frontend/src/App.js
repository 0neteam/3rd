// 📁 src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    alert('로그아웃 완료');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-success" to="/">GiftyMarket</Link>

          <div className="d-flex align-items-center">
            {isLoggedIn && (
              <span className="me-3 text-success fw-bold">
                🎉 환영합니다, {username}님!
              </span>
            )}
            {isLoggedIn ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>로그아웃</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">로그인</Link>
                <Link to="/register" className="btn btn-outline-success">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '30px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
