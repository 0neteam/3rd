// GifticonList.jsx
import React from 'react';
import GifticonCard from './GifticonCard';

const GifticonList = ({
  items,
  favorites,
  cart,
  onToggleFavorite,
  onAddToCart
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {items.map(item => (
          <GifticonCard
            key={item.id}
            item={item}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
            isFavorite={favorites.some(fav => fav.id === item.id)}
            isInCart={cart.some(c => c.id === item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GifticonList;