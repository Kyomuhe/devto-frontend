import React from 'react';
import { MessageCircle, Bookmark } from 'lucide-react';
import { tagColors } from '../data/samplePosts';

const PostCard = ({ post }) => {
  const getTagColorClass = (color) => {
    return tagColors[color] || tagColors.gray;
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Post Image */}
      {post.hasImage && post.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.author.profileImage}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
              {post.author.name}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer leading-tight">
          {post.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded border cursor-pointer hover:opacity-80 ${getTagColorClass(tag.color)}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Post Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            {/* Reactions */}
            <div className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer">
              <div className="flex">
                {post.reactions.types.map((emoji, index) => (
                  <span key={index} className="text-sm">
                    {emoji}
                  </span>
                ))}
              </div>
              <span className="font-medium">
                {post.reactions.count} reaction{post.reactions.count !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Comments */}
            <div className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer">
              <MessageCircle className="w-4 h-4" />
              <span>
                {post.comments === 0 ? 'Add Comment' : `${post.comments} comment${post.comments !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Read Time */}
            <span className="text-xs">
              {post.readTime}
            </span>

            {/* Bookmark */}
            <button className="hover:bg-gray-50 p-1 rounded">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;