import React, { useState } from "react";
import api from "../services/api";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, content };

    try {
      const response = await api.post("/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰을 헤더에 포함
        },
      });
      alert("게시물 작성 성공");
    } catch (error) {
      console.error("게시물 작성 실패", error);
      alert("게시물 작성 실패");
    }
  };

  return (
    <div>
      <h2>게시물 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">게시물 작성</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
