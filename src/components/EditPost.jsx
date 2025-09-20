import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreatePost from '../models/CreatePost';

const EditPost = ({ user }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [existingPost, setExistingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (postId && user?.id) {
      fetchPostData();
    }
  }, [postId, user]);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/posts/${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch post data');
      }
      
      const post = await response.json();
      
      // Verify that the user owns this post
      if (post.user.id !== user.id) {
        setError('You do not have permission to edit this post');
        return;
      }
      
      setExistingPost(post);
    } catch (error) {
      console.error('Error fetching post data:', error);
      setError('Failed to load post data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/my-posts')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Back to My Posts
          </button>
        </div>
      </div>
    );
  }

  if (!existingPost) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Post not found</p>
        </div>
      </div>
    );
  }

  return <CreatePost user={user} existingPost={existingPost} isEditing={true} />;
};

export default EditPost;