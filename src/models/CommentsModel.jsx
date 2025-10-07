import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { commentsAPI } from '../services/api';
import defaultAvatar from '../assets/default.png';

const CommentsModal = ({ 
  isOpen, 
  onClose, 
  postId, 
  currentUserId 
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (isOpen && postId) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsAPI.getCommentsByPost(postId);
      setComments(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUserId) return;

    try {
      setSubmitting(true);
      const response = await commentsAPI.createComment(
        postId, 
        currentUserId, 
        newComment.trim()
      );
      
      if (response && !response.error) {
        setNewComment('');
        await fetchComments(); // Refresh comments
      } else {
        console.error('Error creating comment:', response?.error);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    } catch (error) {
      return dateString;
    }
  };

  // Display first 2 comments by default, all if showAllComments is true
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const hasMoreComments = comments.length > 2;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <>
              {displayedComments.map((comment) => (
                <div key={comment.commentId} className="flex space-x-3">
                  <img
                    src={
                      comment.user?.id 
                        ? `http://localhost:8081/api/v1/auth/user/${comment.user.id}/profile-image`
                        : defaultAvatar
                    }
                    alt={comment.user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover bg-gray-200 flex-shrink-0"
                    onError={(e) => {
                      if (e.target.src !== defaultAvatar) {
                        e.target.src = defaultAvatar;
                      }
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
              
              {hasMoreComments && !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {comments.length} comments
                </button>
              )}
              
              {showAllComments && hasMoreComments && (
                <button
                  onClick={() => setShowAllComments(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <img
              src={
                currentUserId 
                  ? `http://localhost:8081/api/v1/auth/user/${currentUserId}/profile-image`
                  : defaultAvatar
              }
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover bg-gray-200 flex-shrink-0"
              onError={(e) => {
                if (e.target.src !== defaultAvatar) {
                  e.target.src = defaultAvatar;
                }
              }}
            />
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={submitting || !currentUserId}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || submitting || !currentUserId}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          {!currentUserId && (
            <p className="text-xs text-gray-500 mt-2">
              Please log in to comment
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;