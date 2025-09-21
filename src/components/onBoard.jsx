import React, { useState,useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.webp'
import PostCard from './PostCard';

const OnBoard = ({onLogout, userToken, user}) => {
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      // Fetch posts from your backend API
      fetch('http://localhost:8081/posts/display')
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.error('Failed to fetch posts:', err));
    }, []);
  

  const suggestedActions = [
    { id: 'welcome-thread', emoji: '😊', text: 'Join the Welcome thread', action: 'welcome' },
    { id: 'first-post', emoji: '✍️', text: 'Write your first DEV Community post', action: 'write-post' },
    { id: 'customize-profile', emoji: '🎨', text: 'Customize your profile', action: 'profile' },
    { id: 'explore-topics', emoji: '🔍', text: "Explore topics you're interested in", action: 'topics' }
  ];

  const handleActionClick = (action) => {
    console.log('Action clicked:', action);
  };

  const handleClose = () => {
    setShowWelcome(false);
  };

  return (
    <div className="mx-auto space-y-4 p-3">
      {/* Input Field */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      {showWelcome && (
        <div className="bg-blue-600 text-white rounded-2xl p-8 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex justify-start mb-6">
            <img src={logo} alt="DEV" className="w-16 h-16" />
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              You're now a part of the community!
            </h2>
            <p className="text-blue-100 text-sm uppercase tracking-wide">
              SUGGESTED THINGS YOU CAN DO
            </p>
          </div>

          {/* Action Items */}
          <div className="space-y-3">
            {suggestedActions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleActionClick(item.action)}
                className="w-full bg-blue-700 hover:bg-blue-800 rounded-lg p-4 flex items-center justify-between transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-200" />
              </button>
            ))}
          </div>
        </div>
      )}

            {/* posts*/}
            <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.postId || post.id} 
              post={post} 
              currentUserId={user?.id} // This is the key addition!
            />
          ))
        )}
            </div>
    </div>
  );
};

export default OnBoard;
