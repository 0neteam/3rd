// 📁 services/cartService.js
import axios from '../api/axios';

export const fetchCartItems = (userId) =>
  axios.get(`/cart/${userId}`).then(res => res.data);

export const addToCart = (userId, gifticonId) =>
  axios.post('/cart', { userId, gifticonId });

export const deleteCartItem = (cartId) =>
  axios.delete(`/cart/${cartId}`);

export const clearCart = (userId) =>
  axios.delete(`/cart/user/${userId}`);
