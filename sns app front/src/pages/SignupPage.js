// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

function SignupPage() {
  return (
    <div style={pageStyle}>
      <h1>회원 가입</h1>
      <SignupForm />
      <p>
        이미 계정이 있습니까? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}

export default SignupPage;
