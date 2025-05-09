// src/components/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import EmailVerificationForm from '../components/EmailVerificationForm';
import axios from 'axios';
import styles from './SignupForm.module.css';

function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendVerificationEmail = async () => {
    try {
      const res = await axios.post('/api/email/send', { email: form.email });
      if (res.data.message) {
        setVerificationSent(true);
      }
    } catch (err) {
      console.error('인증 메일 전송 실패:', err);
      setError('인증 메일 전송에 실패했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmissionError('');
    setIsSubmitting(true);

    if (!form.email || !validateEmail(form.email)) {
      setError('올바른 이메일 형식을 입력하세요.');
      setIsSubmitting(false);
      return;
    }
    if (!form.username) {
      setError('사용자 이름을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    if (!form.password) {
      setError('비밀번호를 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }
    if (!emailVerified) {
      setError('이메일 인증을 완료해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      await register({
        email: form.email,
        username: form.username,
        password: form.password,
      });
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      setSubmissionError(err.response?.data?.message || '회원 가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (e.target.id === 'email') {
      setVerificationSent(false);
      setEmailVerified(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>회원 가입</h2>
      {error && <p className={styles.error}>{error}</p>}
      {submissionError && <p className={styles.error}>{submissionError}</p>}

      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {!verificationSent && validateEmail(form.email) && (
          <button type="button" onClick={sendVerificationEmail} style={{ marginTop: '5px' }}>
            인증 메일 보내기
          </button>
        )}
      </div>

      {/* 이메일 인증폼 */}
      {verificationSent && !emailVerified && (
        <EmailVerificationForm email={form.email} onSuccess={() => setEmailVerified(true)} />
      )}

      {/* 사용자 이름 */}
      <div>
        <label htmlFor="username">사용자 이름</label>
        <input
          type="text"
          id="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '가입 중...' : '가입하기'}
      </button>
    </form>
  );
}

export default SignupForm;
