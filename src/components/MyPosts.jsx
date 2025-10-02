import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import PostCard from './PostCard';

const MyPosts = ({ user }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, postTitle: '' });

  useEffect(() => {
    if (user?.id) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/v1/posts/user/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const userPosts = await response.json();
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (postId) => navigate(`/edit-post/${postId}`);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/posts/delete/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(post => post.postId !== postId));
      setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  const openDeleteModal = (postId, postTitle) => {
    setDeleteModal({ isOpen: true, postId, postTitle });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
  };

  // Custom actions component for each post
  const renderCustomActions = (post) => (
    <>
      <div className="flex items-center space-x-1 text-sm text-gray-500 mr-2">
        <Eye className="w-4 h-4" />
        <span>Views</span>
      </div>
      <button
        onClick={() => handleEditPost(post.postId)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="Edit post"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => openDeleteModal(post.postId, post.title)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete post"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   try {
  //     const date = new Date(dateString);
  //     return date.toLocaleDateString('en-US', { 
  //       month: 'short', 
  //       day: 'numeric',
  //       year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  //     });
  //   } catch {
  //     return dateString;
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Posts</h1>
            <p className="text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-8">Start sharing your thoughts with the community!</p>
            <button
              onClick={() => navigate('/create-post')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.postId} 
                post={post} 
                currentUserId={user?.id}
                isInitiallyBookmarked={false}
                onBookmarkChange={() => {}}
                customActions={renderCustomActions(post)}
                showMyPostsMode={true}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform animate-scaleIn">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post</h3>
                <p className="text-gray-600 leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{deleteModal.postTitle}"</span>? This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePost(deleteModal.postId)}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors duration-300 shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default MyPosts;