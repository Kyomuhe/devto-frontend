import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react';
import defaultAvatar from '../assets/default.png';

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
      const response = await fetch(`http://localhost:8081/posts/user/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const userPosts = await response.json();
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8081/posts/delete/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the deleted post from the local state
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    } catch (error) {
      return dateString;
    }
  };

  const parseTags = (tags) => {
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else if (Array.isArray(tags)) {
      return tags.map(tag => 
        typeof tag === 'object' && tag.name ? tag.name : String(tag)
      ).filter(tag => tag);
    }
    return [];
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg mb-6"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Posts</h1>
            <p className="text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
            </p>
          </div>
          <button
            onClick={() => navigate('/create-post')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Create New Post
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Edit className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">Start sharing your thoughts with the community!</p>
          <button
            onClick={() => navigate('/create-post')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.postId} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Post Image */}
              {post.coverImage && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={`http://localhost:8081/posts/image/${post.postId}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.id ? `http://localhost:8081/api/auth/user/${user.id}/profile-image` : defaultAvatar}
                      alt={user?.Name || 'Anonymous'}
                      className="w-8 h-8 rounded-full object-cover bg-gray-200"
                      onError={(e) => {
                        if (e.target.src !== defaultAvatar) {
                          e.target.src = defaultAvatar;
                        }
                      }}
                    />
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">
                        {user?.Name || 'Anonymous'}
                      </span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.createdAt || post.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditPost(post.postId)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      title="Edit post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(post.postId, post.title)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Post Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight cursor-pointer hover:text-blue-600">
                  {post.title}
                </h2>

                {/* Post Description */}
                {post.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description.length > 150 
                      ? `${post.description.substring(0, 150)}...` 
                      : post.description
                    }
                  </p>
                )}

                {/* Tags */}
                {parseTags(post.tags).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parseTags(post.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded border bg-gray-50 text-gray-700 border-gray-200"
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Views</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last updated {formatDate(post.updatedAt || post.createdAt)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyPosts;