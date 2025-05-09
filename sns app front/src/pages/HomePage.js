import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import PostEditForm from '../components/PostEditForm';
import useFetch from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const { isAuthenticated, user, navigate } = useAuth();
  const { data: posts, loading, error } = useFetch('/api/posts');
  const [editingPost, setEditingPost] = useState(null);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loading) return <p>📦 게시글 로딩 중...</p>;
  if (error) return <p>❌ 게시글 불러오기 오류</p>;

  const handlePostDeleted = (deletedPostId) => {
    toast.success('🗑️ 게시글이 삭제되었습니다!');
    window.location.reload();
  };

  const handlePostUpdated = () => {
    toast.success('✅ 게시글이 수정되었습니다!');
    setEditingPost(null);
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5">🏡 홈</h1>

      {isAuthenticated && (
        <PostForm onPostCreated={() => window.location.reload()} />
      )}

      <div className="flex flex-col gap-4">
        {posts && posts.map(post => (
          <div key={post.id} className="card">
            <Post
              post={post}
              onPostDeleted={handlePostDeleted}
              onEditClick={(post) => setEditingPost(post)}
            />
          </div>
        ))}
      </div>

      {editingPost && (
        <PostEditForm
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onUpdated={handlePostUpdated}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default HomePage;
