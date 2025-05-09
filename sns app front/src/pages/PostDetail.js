import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${postId}`);
        const sortedComments = res.data.comments.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setPost({ ...res.data, comments: sortedComments });
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      const res = await api.post(`/api/comments/${postId}`, null, {
        params: { content: commentContent },
      });

      const newComment = res.data;
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ),
        commentCount: prev.commentCount + 1,
      }));
      setCommentContent("");
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2>{post.content}</h2>
      {post.imageUrl && (
        <img
          src={`http://localhost:8081${post.imageUrl}`}
          alt="게시글 이미지"
          style={{ maxWidth: "100%" }}
        />
      )}
      <p>작성자: {post.username}</p>
      <p className="text-gray-400 text-sm">
        작성 시간: {new Date(post.createdAt).toLocaleString()}
      </p>

      <hr />

      <h3>댓글</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          댓글 달기
        </button>
      </form>

      <ul>
        {post.comments &&
          post.comments.map((c) => (
            <li key={c.id} style={{ marginTop: "8px" }}>
              <strong>{c.username}</strong>: {c.content}
              <div style={{ fontSize: "0.8rem", color: "gray" }}>
                작성 시간: {new Date(c.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostDetail;
