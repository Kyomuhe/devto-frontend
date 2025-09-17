import React from 'react';
import { MessageCircle, Bookmark, Heart } from 'lucide-react';
import defaultAvatar from '../assets/default.png';

const PostCard = ({ post }) => {
  // Default tag colors since we removed the import
  const tagColors = {
    blue: 'text-blue-700 bg-blue-50 border-blue-200',
    green: 'text-green-700 bg-green-50 border-green-200',
    purple: 'text-purple-700 bg-purple-50 border-purple-200',
    yellow: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    red: 'text-red-700 bg-red-50 border-red-200',
    gray: 'text-gray-700 bg-gray-50 border-gray-200',
  };

  const getTagColorClass = (tagName) => {
    // Simple color assignment based on tag name hash
    const colors = Object.keys(tagColors);
    // Ensure tagName is a string and handle edge cases
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

  // Format date if it's a timestamp
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

        {/* Post Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors">
              <Heart className="w-4 h-4" />
              <span className="font-medium">React</span>
            </button>

            <button className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Bookmark */}
            <button className="hover:bg-gray-50 p-1 rounded transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;