import React, { useState, useEffect } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import PostCard from '../components/PostCard';
import center from '../assets/center.webp';

const CenterContent = () => {
  const [activeTab, setActiveTab] = useState('relevant');
  const [showLiveEvent, setShowLiveEvent] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your backend API
    fetch('http://localhost:8081/posts/display')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  const tabs = [
    { id: 'relevant', label: 'Relevant' },
    { id: 'latest', label: 'Latest' },
    { id: 'top', label: 'Top' }
  ];

  return (
    <div className="flex-1 max-w-4xl mx-auto p-4">
      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium text-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-6">
        {activeTab === 'relevant' && (
          <>
            {/* DEV Live Events Card */}
            {showLiveEvent && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-600">DEV Live Events</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setShowLiveEvent(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    AWS GenAI LIVE! | September 10, 2025
                  </h2>
                  
                  <div className="relative">
                    <img
                      src={center}
                      alt="AWS GenAI LIVE Event"
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* posts*/}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
              ) : (
                posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'latest' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Latest Posts
            </h3>
            <p className="text-gray-600">
              Latest content functionality will be implemented here.
            </p>
          </div>
        )}

        {activeTab === 'top' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Top Posts
            </h3>
            <p className="text-gray-600">
              Top content functionality will be implemented here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterContent;