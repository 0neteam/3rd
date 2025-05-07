// 📁 components/CartPage.js
import React, { useEffect, useState } from 'react';
import { fetchCartItems, deleteCartItem, clearCart } from '../services/cartService';

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCartItems(userId);
        setCartItems(data);
      } catch (error) {
        console.error('❌ 장바구니 로딩 실패:', error);
      }
    };
    loadCart();
  }, [userId]);

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('❌ 장바구니 항목 삭제 실패:', error);
    }
  };

  const handleClear = async () => {
    try {
      await clearCart(userId);
      setCartItems([]);
    } catch (error) {
      console.error('❌ 장바구니 전체 삭제 실패:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h3>🛒 장바구니</h3>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.name} - {item.price.toLocaleString()}원
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.id)}>삭제</button>
              </li>
            ))}
          </ul>
          <div className="text-end mt-3">
            <strong>총합: {total.toLocaleString()}원</strong>
            <br />
            <button className="btn btn-outline-secondary mt-2" onClick={handleClear}>전체 삭제</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
