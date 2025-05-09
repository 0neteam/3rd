import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📢 새 게시글</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">게시글이 없습니다.</p>
      ) : (
        posts.map((post) => {
          const user = post.user || {};
          const profileImgUrl =
            user.profileImageUrl?.startsWith("http")
              ? user.profileImageUrl
              : user.profileImageUrl
              ? `http://localhost:8081${user.profileImageUrl}`
              : "/default-profile.png";

          return (
            <div key={post.id} className="bg-white rounded-lg shadow p-4 mb-6">
              {/* 작성자 정보 */}
              <div className="flex items-center mb-2">
                <Link to={`/profile/${user.id || ""}`} className="flex items-center gap-2">
                  <img
                    src={profileImgUrl}
                    alt="작성자 프로필"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                  />
                  <span className="font-semibold text-gray-800">
                    {user.username || "알 수 없음"}
                  </span>
                </Link>
              </div>

              {/* 게시글 본문 */}
              <Link to={`/post/${post.id}`}>
                <p className="text-lg font-semibold text-gray-900 hover:underline">
                  {post.content?.length > 100
                    ? post.content.slice(0, 100) + "..."
                    : post.content}
                </p>
              </Link>

              {/* 게시글 이미지 */}
              {post.imageUrl && (
                <div className="mt-3">
                  <img
                    src={`http://localhost:8081${post.imageUrl}`}
                    alt="게시글 이미지"
                    className="rounded-lg w-full max-h-80 object-cover"
                    onError={(e) => { e.target.src = "/default-image.png"; }}
                  />
                </div>
              )}

              {/* 좋아요/댓글 수 */}
              <div className="text-sm text-gray-500 mt-2">
                ❤️ 좋아요 {post.likeCount ?? 0}개&nbsp;&nbsp;
                💬 댓글 {post.commentCount ?? 0}개
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
