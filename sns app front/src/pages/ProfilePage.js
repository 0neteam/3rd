import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import FollowButton from '../components/FollowButton';
import DMModal from '../components/DMModal';
import FollowerModal from '../components/FollowerModal';
import FollowingModal from '../components/FollowingModal';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMe = !id || parseInt(id) === user?.id;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showDMModal, setShowDMModal] = useState(false);
  const [dmReceiver, setDMReceiver] = useState(null);
  const [commentLikes, setCommentLikes] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    fetchUserProfile();
    fetchUserPosts();
    fetchFollowers();
    fetchFollowing();
  }, [id, user]);

  const fetchUserProfile = async () => {
    try {
      const url = id ? `/api/users/${id}` : `/api/users/me`;
      const res = await api.get(url);
      setProfile(res.data);
      setBio(res.data.bio || '');
      setProfileImageUrl(res.data.profileImageUrl || '');
    } catch (err) {
      console.error('프로필 정보 가져오기 실패:', err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await api.get(`/api/posts/user/${id || user.id}`);
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
    }
  };

  const fetchFollowers = async () => {
    try {
      const res = await api.get(`/api/follow/followers/${id || user.id}`);
      setFollowers(res.data);
    } catch (err) {
      console.error('팔로워 불러오기 실패:', err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await api.get(`/api/follow/following/${id || user.id}`);
      setFollowing(res.data);
    } catch (err) {
      console.error('팔로잉 불러오기 실패:', err);
    }
  };

  const handleCommentLike = async (commentId, isLiked) => {
    try {
      if (isLiked) {
        await api.delete(`/api/likes/comments/${commentId}`);
        setCommentLikes(prev => ({ ...prev, [commentId]: false }));
      } else {
        await api.post(`/api/likes/comments/${commentId}`);
        setCommentLikes(prev => ({ ...prev, [commentId]: true }));
      }
    } catch (err) {
      console.error('댓글 좋아요 처리 실패:', err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!newComments[postId]?.trim()) return;

    try {
      const res = await api.post(`/api/comments/${postId}`, null, {
        params: { content: newComments[postId] },
      });
      const newComment = res.data;
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, comments: [...p.comments, newComment], commentCount: p.commentCount + 1 }
            : p
        )
      );
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('댓글 작성 실패:', err);
    }
  };

  const handleBioSave = async () => {
    try {
      await api.put('/api/users/me/text', {
        bio,
        profileImageUrl: profile.profileImageUrl,
      });
      setEditingBio(false);
    } catch (err) {
      console.error('자기소개 저장 실패:', err);
    }
  };

  const fullProfileImageUrl = profileImageUrl?.startsWith('http') ? profileImageUrl : `http://localhost:8081${profileImageUrl}`;

  if (!profile) return <div className="text-center py-10">⏳ 로딩 중...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      <FollowerModal isOpen={showFollowerModal} onClose={() => setShowFollowerModal(false)} followers={followers} onUserClick={(uid) => navigate(`/profile/${uid}`)} />
      <FollowingModal isOpen={showFollowingModal} onClose={() => setShowFollowingModal(false)} following={following} onUserClick={(uid) => navigate(`/profile/${uid}`)} />

      {showDMModal && dmReceiver && (
        <DMModal receiver={dmReceiver} onClose={() => setShowDMModal(false)} />
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <img
          src={fullProfileImageUrl || '/default-profile.png'}
          alt="프로필"
          style={{ width: '144px', height: '144px', objectFit: 'cover', borderRadius: '9999px' }}
          className="border shadow-sm"
          onError={(e) => (e.target.src = '/default-profile.png')}
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{profile.username}</h2>

          {isMe ? (
            editingBio ? (
              <div className="mt-2">
                <textarea className="border rounded w-full p-2 text-sm" value={bio} onChange={(e) => setBio(e.target.value)} />
                <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded" onClick={handleBioSave}>저장</button>
              </div>
            ) : (
              <div className="text-gray-600 mt-1">
                <p>{bio}</p>
                <button className="text-blue-500 text-sm mt-1 underline" onClick={() => setEditingBio(true)}>자기소개 수정</button>
              </div>
            )
          ) : (
            <p className="text-gray-600 mt-1">{bio}</p>
          )}

          {!isMe && (
            <div className="flex gap-3 mt-3 justify-center md:justify-start">
              <FollowButton targetUserId={profile.id} />
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  console.log("🔵 메시지 버튼 클릭됨", profile);
                  const receiverData = {
                    id: profile.id,
                    username: profile.username,
                    profileImageUrl: profile.profileImageUrl,
                  };
                  setDMReceiver(receiverData);
                  setShowDMModal(true);
                }}
              >
                메시지
              </button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500 space-x-3">
            <span className="cursor-pointer hover:underline" onClick={() => setShowFollowerModal(true)}>
              👥 팔로워 {followers.length}명
            </span>
            <span className="cursor-pointer hover:underline" onClick={() => setShowFollowingModal(true)}>
              ➡️ 팔로잉 {following.length}명
            </span>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">📋 작성한 게시글</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">작성한 게시글이 없습니다.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-neutral-900 p-4 mb-4 rounded shadow">
            <p className="mb-2">{post.content}</p>
            {post.imageUrl && (
              <img src={`http://localhost:8081${post.imageUrl}`} alt="게시글 이미지" className="rounded w-full max-h-64 object-cover" />
            )}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              🕒 {new Date(post.createdAt).toLocaleString()}<br />
              ❤️ {post.likeCount} | 💬 {post.commentCount}
            </div>

            <div className="mt-2 space-y-2">
              {post.comments.map(comment => (
                <div key={comment.id} className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>{comment.content}</span>
                    <button onClick={() => handleCommentLike(comment.id, commentLikes[comment.id])}>
                      {commentLikes[comment.id] ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    🕒 {new Date(comment.createdAt).toLocaleString()} — {comment.username}
                  </div>
                </div>
              ))}
              <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newComments[post.id] || ''}
                  onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                  placeholder="댓글 작성..."
                  className="flex-grow border rounded px-2 py-1 text-sm"
                />
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                  작성
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfilePage;
