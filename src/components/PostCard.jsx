import React, { useState, useEffect } from 'react';
import { MessageCircle, Bookmark, Heart, Send } from 'lucide-react';
import defaultAvatar from '../assets/default.png';
import { likesAPI, commentsAPI } from '../services/api';

const PostCard = ({ post, currentUserId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Default tag colors
  const tagColors = {
    blue: 'text-blue-700 bg-blue-50 border-blue-200',
    green: 'text-green-700 bg-green-50 border-green-200',
    purple: 'text-purple-700 bg-purple-50 border-purple-200',
    yellow: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    red: 'text-red-700 bg-red-50 border-red-200',
    gray: 'text-gray-700 bg-gray-50 border-gray-200',
  };

  useEffect(() => {
    if (post.postId) {
      fetchPostStats();
    }
  }, [post.postId, currentUserId]);

  const fetchPostStats = async () => {
    try {
      const requests = [
        likesAPI.getLikeCount(post.postId),
        commentsAPI.getCommentCount(post.postId)
      ];

      // Only check like status if user is logged in
      if (currentUserId) {
        requests.push(likesAPI.hasUserLikedPost(post.postId, currentUserId));
      }

      const responses = await Promise.all(requests);
      
      setLikeCount(responses[0]?.likeCount || 0);
      setCommentCount(responses[1]?.commentCount || 0);
      
      if (currentUserId && responses[2]) {
        setIsLiked(responses[2]?.liked || false);
      }
    } catch (error) {
      console.error('Error fetching post stats:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getCommentsByPost(post.postId);
      setComments(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const handleLikeToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUserId || loading) {
      console.log('Cannot like: user not logged in or loading');
      return;
    }

    try {
      setLoading(true);
      console.log('Toggling like for post:', post.postId, 'user:', currentUserId);
      
      const response = await likesAPI.toggleLike(post.postId, currentUserId);
      console.log('Like toggle response:', response);
      
      if (response && !response.error) {
        setIsLiked(response.liked);
        // Update like count immediately
        if (response.liked) {
          setLikeCount(prev => prev + 1);
        } else {
          setLikeCount(prev => Math.max(0, prev - 1));
        }
      } else {
        console.error('Like toggle error:', response);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentClick = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !currentUserId || submittingComment) {
      return;
    }

    try {
      setSubmittingComment(true);
      console.log('Submitting comment:', { postId: post.postId, userId: currentUserId, content: newComment });
      
      const response = await commentsAPI.createComment(
        post.postId, 
        currentUserId, 
        newComment.trim()
      );
      
      console.log('Comment response:', response);
      
      if (response && !response.error) {
        setNewComment('');
        await fetchComments(); // Refresh comments
        setCommentCount(prev => prev + 1);
      } else {
        console.error('Error creating comment:', response);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const getTagColorClass = (tagName) => {
    const colors = Object.keys(tagColors);
    const tagString = String(tagName || '');
    const hash = tagString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorKey = colors[hash % colors.length];
    return tagColors[colorKey];
  };

  const parsedTags = (() => {
    if (typeof post.tags === 'string') {
      return post.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else if (Array.isArray(post.tags)) {
      return post.tags.map(tag => 
        typeof tag === 'object' && tag.name ? tag.name : String(tag)
      ).filter(tag => tag);
    }
    return [];
  })();

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

  // Display first 2 comments by default
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const hasMoreComments = comments.length > 2;

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Post Image */}
      {post.coverImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={`http://localhost:8081/posts/image/${post.postId}`}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
            onError={(e) => {
              console.log('Cover image failed to load for post ID:', post.postId);
              e.target.style.display = 'none';
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={
              (post.user?.id || post.author?.id) 
                ? `http://localhost:8081/api/auth/user/${post.user?.id || post.author?.id}/profile-image`
                : defaultAvatar
            }
            alt={post.user?.name || post.author?.name || 'Anonymous'}
            className="w-8 h-8 rounded-full object-cover bg-gray-200"
            onError={(e) => {
              if (e.target.src !== defaultAvatar) {
                e.target.src = defaultAvatar;
              }
            }}
          />

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
              {post.user?.name || post.author?.name || 'Anonymous'}
            </span>
            <span>•</span>
            <span>{formatDate(post.createdAt || post.date)}</span>
          </div>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer leading-tight">
          {post.title}
        </h2>

        {/* Post Description/Content Preview */}
        {post.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.description.length > 150 
              ? `${post.description.substring(0, 150)}...` 
              : post.description
            }
          </p>
        )}

        {/* Tags */}
        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {parsedTags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-medium rounded border cursor-pointer hover:opacity-80 ${getTagColorClass(tag)}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Stats and Actions */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button 
              onClick={handleLikeToggle}
              disabled={!currentUserId || loading}
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-200 ${
                isLiked 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'hover:bg-gray-50 hover:text-red-600'
              } ${!currentUserId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <Heart 
                className={`w-4 h-4 transition-all duration-200 ${
                  isLiked ? 'fill-current text-red-600' : ''
                }`} 
              />
              <span className="font-medium">
                {likeCount > 0 ? likeCount : 'Like'}
              </span>
            </button>

            {/* Comment Button */}
            <button 
              onClick={handleCommentClick}
              className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {commentCount > 0 ? `${commentCount} Comment${commentCount > 1 ? 's' : ''}` : 'Comment'}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Bookmark */}
            <button className="hover:bg-gray-50 p-1 rounded transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-100 pt-4">
            {/* Comments List */}
            {comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {displayedComments.map((comment) => (
                  <div key={comment.commentId} className="flex space-x-3">
                    <img
                      src={
                        comment.user?.id 
                          ? `http://localhost:8081/api/auth/user/${comment.user.id}/profile-image`
                          : defaultAvatar
                      }
                      alt={comment.user?.name || 'User'}
                      className="w-6 h-6 rounded-full object-cover bg-gray-200 flex-shrink-0 mt-1"
                      onError={(e) => {
                        if (e.target.src !== defaultAvatar) {
                          e.target.src = defaultAvatar;
                        }
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg px-3 py-2">
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
                  </div>
                ))}
                
                {hasMoreComments && !showAllComments && (
                  <button
                    onClick={() => setShowAllComments(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-9"
                  >
                    View all {comments.length} comments
                  </button>
                )}
                
                {showAllComments && hasMoreComments && (
                  <button
                    onClick={() => setShowAllComments(false)}
                    className="text-sm text-gray-600 hover:text-gray-800 ml-9"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}

            {/* Comment Input */}
            {currentUserId ? (
              <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                <img
                  src={`http://localhost:8081/api/auth/user/${currentUserId}/profile-image`}
                  alt="Your avatar"
                  className="w-6 h-6 rounded-full object-cover bg-gray-200 flex-shrink-0 mt-2"
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
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                    disabled={submittingComment}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || submittingComment}
                    className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  Please log in to comment on this post
                </p>
              </div>
            )}
          </div>
        )}

        {/* Login prompt for non-authenticated users */}
        {!currentUserId && (
          <div className="mt-3 text-xs text-gray-500">
            <span>Please log in to like and comment on posts</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;