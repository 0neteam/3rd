import axios from '../api/axios';

export const purchase = (userId, items, totalPrice) =>
  axios.post('/purchase', {
    userId,
    totalPrice,
    items  // ✅ gifticon 객체 배열
  });

export const getPurchaseHistory = (userId) =>
  axios.get(`/purchase/${userId}`).then(res => res.data);
