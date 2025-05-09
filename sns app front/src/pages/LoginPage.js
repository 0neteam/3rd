// ✅ src/pages/LoginPage.js
import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
};

function LoginPage() {
    return (
        <div style={pageStyle}>
            <h1>로그인</h1>
            <LoginForm />
          
            <p>
                계정이 없으신가요? <Link to="/signup">회원 가입</Link>
            </p>
        </div>
    );
}

export default LoginPage;