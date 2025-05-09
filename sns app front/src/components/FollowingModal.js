import React from 'react';
import ReactDOM from 'react-dom';

const FollowingModal = ({ isOpen, onClose, following, onUserClick }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">➡️ 팔로잉 목록</h2>
        {following.length === 0 ? (
          <p className="text-gray-500">팔로우한 사람이 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {following.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => onUserClick(user.id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-4 w-full py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">
          닫기
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default FollowingModal;
