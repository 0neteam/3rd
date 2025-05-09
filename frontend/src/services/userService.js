// 📁 src/services/userService.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 회원가입
export async function registerUser(user) {
  return await instance.post('/user/register', user);
}
// 로그인
export async function loginUser(user) {
  try {
    const res = await instance.post('/user/login', user);

    // ✅ 응답이 없거나 success가 false일 경우 예외 처리
    if (!res.data || !res.data.success) {
      throw new Error('❌ 로그인 실패: 아이디 또는 비밀번호가 틀립니다.');
    }

    return res.data; // { success: true, token: '...' }
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error('❌ 로그인 실패: 아이디 또는 비밀번호가 틀립니다.');
    }
    throw new Error('❌ 서버 오류 발생');
  }
}
