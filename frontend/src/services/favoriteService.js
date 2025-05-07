import axios from '../api/axios';

export const fetchFavoritesByUser = async (userId) => {
  const res = await axios.get(`/favorites/${userId}`);
  return res.data;
};

// 📁 src/services/favoriteService.js

export const addFavorite = async (userId, gifticonId) => {
  console.log(`🔼 addFavorite 호출: userId=${userId}, gifticonId=${gifticonId}`);
  const res = await axios.post('/favorites', { userId, gifticonId });
  return res.data;
};

export const deleteFavoriteByUserAndGifticon = async (userId, gifticonId) => {
  console.log(`🔽 deleteFavorite 호출: userId=${userId}, gifticonId=${gifticonId}`);
  const res = await axios.delete('/favorites', {
    data: { userId, gifticonId }
  });
  return res.data;
};