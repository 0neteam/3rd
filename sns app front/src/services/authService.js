// ✅ authService.js - 환경변수 기반 axios 인스턴스 적용 + 결과 스타일 반영
import api from '../services/api';
import '../styles/AuthStyles.css'; // ✨ 스타일 적용

// ✅ 로그인
export const login = async (email, password) => {
  return api.post('/users/login', { email, password });
};

// ✅ 테스트용 로그인
export const testLogin = async () => {
  try {
    const res = await login('test@example.com', '123456');
    console.log('%c✅ 로그인 성공:', 'color: green; font-weight: bold;', res.data);
  } catch (error) {
    console.error('%c❌ 로그인 실패:', 'color: red; font-weight: bold;', error.response?.data || error.message);
  }
};

// ✅ 회원가입
export const register = async (formData) => {
  return await api.post('/users/register', formData);
};

// ✅ 사용자 정보 가져오기
export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// ✅ 로그아웃
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// ✅ 비밀번호 변경
export const changePassword = async (currentPassword, newPassword) => {
  return await api.put('/users/password', { currentPassword, newPassword });
};
