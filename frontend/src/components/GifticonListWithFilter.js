import React, { useState } from 'react';
import GifticonCard from './GifticonCard';

const GifticonListWithFilter = ({ items, favorites, cart, onToggleFavorite, onAddToCart, getBadgeClass }) => {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [brandFilter, setBrandFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const brandOptions = [...new Set(items.map(item => item.brand))];

  // 필터링된 아이템
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (brandFilter === '' || item.brand === brandFilter)
  );

  // 정렬 로직
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'discount-asc': return a.discountPercent - b.discountPercent;
      case 'discount-desc': return b.discountPercent - a.discountPercent;
      case 'expireDate-asc': return new Date(a.expireDate) - new Date(b.expireDate); // 유효기간 빠른 순
      case 'expireDate-desc': return new Date(b.expireDate) - new Date(a.expireDate); // 유효기간 느린 순
      default: return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') setCurrentPage(1);
  };

  const optionText = {
    'name-asc': '이름 오름차순 (A → Z)',
    'name-desc': '이름 내림차순 (Z → A)',
    'price-asc': '가격 낮은 순 (↑)',
    'price-desc': '가격 높은 순 (↓)',
    'discount-asc': '할인율 낮은 순 (↑)',
    'discount-desc': '할인율 높은 순 (↓)',
    'expireDate-asc': '유효기간 빠른 순',
    'expireDate-desc': '유효기간 느린 순'
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">기프티콘 마켓</h3>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="기프티콘 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={brandFilter}
            onChange={(e) => {
              setBrandFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">전체 브랜드</option>
            {brandOptions.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="default">정렬 선택</option> {/* 추가된 초기화 옵션 */}
            {Object.entries(optionText).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <GifticonCard
              key={item.id}
              item={item}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              isFavorite={favorites.some(f => f.id === item.id)}
              isInCart={cart.some(c => c.id === item.id)}
              getBadgeClass={getBadgeClass}
            />
          ))
        ) : (
          <p className="text-center">검색 결과가 없습니다.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>이전</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>다음</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GifticonListWithFilter;

