// 📁 components/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { getFavorites, deleteFavoriteByUserAndGifticon } from '../services/favoriteService';

const FavoritesPage = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites(userId).then(setFavorites);
  }, [userId]);

  const handleRemove = async (gifticonId) => {
    await deleteFavoriteByUserAndGifticon(userId, gifticonId);
    setFavorites(favorites.filter(item => item.id !== gifticonId));
  };

  return (
    <div>
      <h3>🧡 찜한 기프티콘</h3>
      {favorites.length === 0 ? <p>찜한 항목이 없습니다.</p> : (
        <ul className="list-group">
          {favorites.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              {item.name}
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;