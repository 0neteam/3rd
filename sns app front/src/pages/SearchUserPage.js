import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function SearchUserPage() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("검색어를 입력하세요.");
      return;
    }
    try {
      const res = await api.get(`/api/users/search`, {
        params: { username: keyword }
      });
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("검색 실패:", err);
      setError("검색 실패. 다시 시도해주세요.");
      setUsers([]);
    }
  };

  const handleFollowToggle = async (targetUserId, isFollowing) => {
    try {
      if (isFollowing) {
        await api.delete(`/api/users/follow/${targetUserId}`);
      } else {
        await api.post(`/api/users/follow/${targetUserId}`);
      }
      // 최신 상태 반영
      handleSearch(new Event('submit'));
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 사용자 검색</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="닉네임으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          검색
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 && !error ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        users.map(user => {
          const imgUrl = user.profileImageUrl?.startsWith('http')
            ? user.profileImageUrl
            : user.profileImageUrl
              ? `http://localhost:8081${user.profileImageUrl}`
              : '/default-profile.png';

          return (
            <div key={user.id} className="flex justify-between items-center border-b py-3">
              <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
                <img
                  src={imgUrl}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => (e.target.src = '/default-profile.png')}
                />
                <div>
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </Link>
              <button
                onClick={() => handleFollowToggle(user.id, user.following)}
                className={`text-white px-3 py-1 rounded ${
                  user.following ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                {user.following ? '언팔로우' : '팔로우'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SearchUserPage;
