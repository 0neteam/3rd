import React, { useState, useEffect } from 'react';
import GifticonListWithFilter from '../components/GifticonListWithFilter';
import { addFavorite, deleteFavoriteByUserAndGifticon } from '../services/favoriteService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../GifticonCard.css';

function HomePage() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showPage, setShowPage] = useState('home');

  const [favoriteSortOption, setFavoriteSortOption] = useState('price-asc');
  const [cartSortOption, setCartSortOption] = useState('default');

  const userId = 1;

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      const brands = ['스타북스', '투슨플레이스', '이디야', '배달의민족', 'GS25', 'CU', '마켓컴커리', '네이버페이', '카카오', '올리브영'];
      const brandImages = {
        '스타북스': 'starbucks.jpg',
        '투슨플레이스': 'twosome.jpg',
        '이디야': 'ediya.jpg',
        '배달의민족': 'baemin.jpg',
        'GS25': 'gs25.jpg',
        'CU': 'cu.jpg',
        '마켓컴커리': 'marketkurly.jpg',
        '네이버페이': 'naverpay.jpg',
        '카카오': 'kakao.jpg',
        '올리브영': 'oliveyoung.jpg',
      };

      const brandGroups = {};
      let globalId = 1;
      const tempItems = [];

      for (let i = 0; i < 50; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const faceValue = Math.floor(Math.random() * 10 + 1) * 5000;
        const discountRate = Math.random() * 0.45 + 0.05;
        const rawPrice = faceValue * (1 - discountRate);
        const price = Math.round(rawPrice / 100) * 100;
        const discountPercentRaw = (1 - price / faceValue) * 100;
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + i * 10);
        const formattedExpireDate = expireDate.toISOString().split('T')[0];
        const imageUrl = process.env.PUBLIC_URL + '/images/' + (brandImages[brand] || 'default.jpg');

        const item = {
          id: globalId++,
          name: `${brand} 상품권 ${faceValue.toLocaleString()}원권`,
          brand,
          faceValue,
          price,
          discountPercent: +(discountPercentRaw.toFixed(1)),
          stock: Math.floor(Math.random() * 10) + 1,
          imageUrl,
          expireDate: formattedExpireDate,
        };

        if (!brandGroups[brand]) brandGroups[brand] = [];
        brandGroups[brand].push(item);
      }

      Object.values(brandGroups).forEach(group => group.sort(() => Math.random() - 0.5));
      let hasMore = true;
      while (hasMore) {
        hasMore = false;
        for (const brand of brands) {
          if (brandGroups[brand]?.length > 0) {
            tempItems.push(brandGroups[brand].shift());
            hasMore = true;
          }
        }
      }

      setItems(tempItems);
      localStorage.setItem('items', JSON.stringify(tempItems));
    }

    const storedCart = localStorage.getItem('cart');
    const storedHistory = localStorage.getItem('purchaseHistory');
    const storedFavorites = localStorage.getItem('favorites');
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedHistory) setPurchaseHistory(JSON.parse(storedHistory));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory)), [purchaseHistory]);

  const handleToggleFavorite = async (item) => {
    const isFav = favorites.some(f => f.id === item.id);
    try {
      if (isFav) {
        await deleteFavoriteByUserAndGifticon(userId, item.id);
        setFavorites(prev => prev.filter(f => f.id !== item.id));
      } else {
        await addFavorite(userId, item.id);
        setFavorites(prev => [...prev, item]);
      }
    } catch (error) {
      console.error('찜 실패', error);
    }
  };

  const handleAddToCart = (item) => {
    if (!cart.some(c => c.id === item.id)) {
      setCart(prev => [...prev, item]);
      alert('장바구니에 추가!');
    }
  };

  const handleRemoveFavorite = (id) => setFavorites(prev => prev.filter(item => item.id !== id));
  const handleRemoveFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const handleRemovePurchase = (index) => setPurchaseHistory(prev => prev.filter((_, i) => i !== index));

  const handlePurchase = () => {
    if (cart.length === 0) return alert('장바구니가 비어 있습니다.');
    const record = {
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
    };
    setPurchaseHistory(prev => [...prev, record]);
    setCart([]);
    setShowPage('payment');
  };

  const getCartTotal = () => cart.reduce((total, item) => total + item.price, 0);

  const getBadgeClass = (brand) => {
    switch (brand) {
      case '스타북스': return 'bg-success';
      case '배달의민족': return 'bg-info';
      case '이디야': return 'bg-primary';
      case '투슨플레이스': return 'bg-danger';
      case '카카오': return 'bg-warning text-dark';
      case '마켓컴커리': return 'bg-purple text-white';
      case 'GS25': return 'bg-secondary';
      case 'CU': return 'bg-dark';
      case '네이버페이': return 'bg-success';
      case '올리브영': return 'bg-light text-dark';
      default: return 'bg-secondary';
    }
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (favoriteSortOption) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'discount-asc': return a.discountPercent - b.discountPercent;
      case 'discount-desc': return b.discountPercent - a.discountPercent;
      case 'expireDate-asc': return new Date(a.expireDate) - new Date(b.expireDate);
      case 'expireDate-desc': return new Date(b.expireDate) - new Date(a.expireDate);
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const sortedCart = [...cart].sort((a, b) => {
    switch (cartSortOption) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'discount-asc': return a.discountPercent - b.discountPercent;
      case 'discount-desc': return b.discountPercent - a.discountPercent;
      case 'expireDate-asc': return new Date(a.expireDate) - new Date(b.expireDate);
      case 'expireDate-desc': return new Date(b.expireDate) - new Date(a.expireDate);
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const renderSortSelect = (sortOption, handleChange) => (
    <select value={sortOption} onChange={(e) => handleChange(e.target.value)} className="form-select mb-3 w-auto">
      <option value="price-asc">💸 가격 오름차순</option>
      <option value="price-desc">💰 가격 내림차순</option>
      <option value="discount-asc">⬆️ 할인률 오름차순</option>
      <option value="discount-desc">⬇️ 할인률 내림차순</option>
      <option value="expireDate-asc">📅 유효기간 빠른 순</option>
      <option value="expireDate-desc">📅 유효기간 느린 순</option>
    </select>
  );

  return (
    <div className="bg-gradient" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <div className="container py-5">
        <div className="card shadow-lg rounded-4 p-4" style={{ backgroundColor: 'white' }}>
          <div className="text-center mb-4">
            <button className="btn btn-danger me-2" onClick={() => setShowPage('favorites')}>❤️ 찜 ({favorites.length})</button>
            <button className="btn btn-primary me-2" onClick={() => setShowPage('cart')}>🛒 장바구니 ({cart.length})</button>
            <button className="btn btn-warning me-2" onClick={() => setShowPage('payment')}>💳 결제내역 ({purchaseHistory.length})</button>
            <button className="btn btn-dark" onClick={() => setShowPage('home')}>📋 전체 보기</button>
          </div>

          {showPage === 'home' && (
            <GifticonListWithFilter
              items={items}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              favorites={favorites}
              cart={cart}
              favoriteSortOption={favoriteSortOption}
              cartSortOption={cartSortOption}
              setFavoriteSortOption={setFavoriteSortOption}
              setCartSortOption={setCartSortOption}
            />
          )}

          {showPage === 'favorites' && (
            <>
              <h3 className="mb-3">🧡 찜한 기프티콘</h3>
              {renderSortSelect(favoriteSortOption, setFavoriteSortOption)}
              {sortedFavorites.length === 0 ? (
                <p className="text-center">찜한 항목이 없습니다.</p>
              ) : (
                <div className="row">
                  {sortedFavorites.map(item => (
                    <div className="col-md-3 mb-4" key={item.id}>
                      <div className="card h-100 shadow-sm">
                        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h6 className="card-title">{item.name}</h6>
                          <p className="fw-bold text-danger">
                            {item.price.toLocaleString()}원
                            <span className="ms-2" style={{ color: item.discountPercent >= 40 ? 'red' : 'gray', fontWeight: 'bold' }}>
                              ▼{item.discountPercent}%
                            </span>
                          </p>
                          <p className="text-secondary">📦 재고: {item.stock}개</p>
                          <p className="text-secondary">📅 유효기간: {item.expireDate}</p>
                          <button className="btn btn-sm btn-outline-danger w-100" onClick={() => handleRemoveFavorite(item.id)}>❌ 찜 삭제</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {showPage === 'cart' && (
            <>
              <h3 className="mb-3">🛒 장바구니</h3>
              {renderSortSelect(cartSortOption, setCartSortOption)}
              {sortedCart.length === 0 ? (
                <p className="text-center">장바구니가 비어 있습니다.</p>
              ) : (
                <div className="row">
                  {sortedCart.map(item => (
                    <div className="col-md-3 mb-4" key={item.id}>
                      <div className="card h-100 shadow-sm">
                        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h6 className="card-title">{item.name}</h6>
                          <p className="fw-bold text-primary">
                            {item.price.toLocaleString()}원
                            <span className="ms-2" style={{ color: item.discountPercent >= 40 ? 'red' : 'gray', fontWeight: 'bold' }}>
                              ▼{item.discountPercent}%
                            </span>
                          </p>
                          <p className="text-secondary">📦 재고: {item.stock}개</p>
                          <p className="text-secondary">📅 유효기간: {item.expireDate}</p>
                          <button className="btn btn-sm btn-outline-danger w-100" onClick={() => handleRemoveFromCart(item.id)}>❌ 장바구니 삭제</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <div className="text-end mt-4">
                  <h5>총합: {getCartTotal().toLocaleString()}원</h5>
                  <button className="btn btn-success mt-2" onClick={handlePurchase}>🛍️ 구매하기</button>
                </div>
              )}
            </>
          )}

          {showPage === 'payment' && (
            <>
              <h3 className="mb-3">💳 결제 내역</h3>
              {purchaseHistory.length === 0 ? (
                <p className="text-center">결제 내역이 없습니다.</p>
              ) : (
                <div className="row">
                  {purchaseHistory.map((record, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                      <div className="card p-3 shadow-sm">
                        <h6 className="card-title">📅 결제일: {record.date}</h6>
                        <ul className="list-group list-group-flush mb-2">
                          {record.items.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                              {item.name} - {item.price.toLocaleString()}원
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>총합: {record.total.toLocaleString()}원</strong>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemovePurchase(index)}>❌ 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
         )}

         
        </div>
      </div>
    </div>
  );
}

export default HomePage;

