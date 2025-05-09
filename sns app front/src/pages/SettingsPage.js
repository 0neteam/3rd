import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
      setPreviewUrl(user.profileImageUrl?.startsWith('http')
        ? user.profileImageUrl
        : `http://localhost:8081${user.profileImageUrl}`);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const res = await api.put('/api/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      updateUser(res.data); // context 업데이트
      setMessage('✅ 프로필 업데이트 성공!');
    } catch (err) {
      console.error('프로필 업데이트 실패:', err);
      setMessage('❌ 업데이트 실패');
    }
  };

  const handleUsernameChange = async () => {
    try {
      const res = await api.put('/api/users/me/text', {
        bio,
        profileImageUrl: user.profileImageUrl,
        username
      });
      updateUser(res.data);
      setMessage('✅ 닉네임 변경 성공!');
    } catch (err) {
      console.error('닉네임 변경 실패:', err);
      setMessage('❌ 닉네임 변경 실패');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await api.put('/api/users/password', {
        oldPassword,
        newPassword
      });
      setMessage('✅ 비밀번호 변경 성공!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      console.error('비밀번호 변경 실패:', err);
      setMessage('❌ 비밀번호 변경 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">⚙️ 설정</h2>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="mb-4">
        <label>닉네임</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleUsernameChange}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          닉네임 변경
        </button>
      </div>

      <div className="mb-4">
        <label>프로필 이미지</label>
        <input type="file" onChange={handleImageChange} />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="미리보기"
            className="w-20 h-20 rounded-full mt-2 object-cover"
          />
        )}
      </div>

      <div className="mb-4">
        <label>자기소개</label>
        <textarea
          className="w-full border rounded p-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          onClick={handleProfileUpdate}
          className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
        >
          자기소개/프로필 업데이트
        </button>
      </div>

      <hr className="my-6" />

      <div className="mb-4">
        <label>현재 비밀번호</label>
        <input
          type="password"
          className="w-full border rounded p-2"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label>새 비밀번호</label>
        <input
          type="password"
          className="w-full border rounded p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handlePasswordChange}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default SettingsPage;
