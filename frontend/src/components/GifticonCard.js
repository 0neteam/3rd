import React from 'react';

const GifticonCard = ({ item, onToggleFavorite, onAddToCart, isFavorite, isInCart }) => {
  const brandClass = `card-${item.brand.toLowerCase().replace(/\s/g, '')}`;

  return (
    <div className="col-md-3 mb-4">
      <div className={`card h-100 shadow-sm ${brandClass}`}>
        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
        <div className="card-body">
          <h6 className="card-title d-flex justify-content-between align-items-center">
            {item.name}
            <span className="badge bg-secondary text-white">{item.brand}</span>
          </h6>

          <p className="fw-bold text-danger mb-1">
            {item.price.toLocaleString()}원
            <span
              className="ms-2"
              style={{
                color: item.discountPercent >= 40 ? 'red' : 'gray',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}
            >
              ▼{item.discountPercent}%
            </span>
          </p>

          <p className="text-secondary mb-2">📦 재고: {item.stock}개</p>
          <p className="text-secondary">📅 유효기간: {item.expireDate}</p>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onToggleFavorite(item)}
            >
              {isFavorite ? '❤️ 찜됨' : '찜하기'}
            </button>

            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onAddToCart(item)}
              disabled={item.stock === 0 || isInCart}
            >
              {item.stock === 0 ? '품절' : isInCart ? '✔️ 담김' : '🛒 담기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifticonCard;
