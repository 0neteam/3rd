import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/${username}`);
        setUser(res.data);
        setBio(res.data.bio || "");
        setPreviewImage(res.data.profileImageUrl || "/default-profile.png");
      } catch (err) {
        console.error("사용자 정보 가져오기 실패:", err);
      }
    };
    fetchUser();
  }, [username]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      await api.put("/api/users/updateProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("✅ 프로필이 성공적으로 수정되었습니다!");
      window.location.reload();
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("❌ 프로필 수정 실패. 다시 시도해주세요.");
    }
  };

  if (!user) return <p>로딩 중...</p>;

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>{user.username}님의 프로필</h2>

      <div style={{ marginBottom: "20px" }}>
        <img
          src={previewImage}
          alt="프로필 이미지"
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개를 입력하세요"
          rows={4}
          style={{ width: "300px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleImageChange} />
      </div>

      <button 
        onClick={handleSave}
        style={{ padding: "10px 30px", fontWeight: "bold", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        저장하기
      </button>
    </div>
  );
};

export default Profile;
