import React from 'react';
import ReactDOM from 'react-dom';

const FollowerModal = ({ isOpen, onClose, followers, onUserClick }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">👥 팔로워 목록</h2>
        {followers.length === 0 ? (
          <p className="text-gray-500">팔로워가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {followers.map((follower) => (
              <li
                key={follower.id}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => onUserClick(follower.id)}
              >
                {follower.username}
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

export default FollowerModal;
