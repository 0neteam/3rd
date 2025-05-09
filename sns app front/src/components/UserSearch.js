// ✅ 1. UserSearch.js
import React, { useState } from 'react';
import api from '../services/api';

function UserSearch({ onSelectUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/api/users/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error('검색 실패:', err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="사용자 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {results.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;