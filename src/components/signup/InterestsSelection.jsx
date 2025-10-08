import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

const InterestsSelection = ({ onContinue, onBack, currentStep = 2, totalSteps = 5 }) => {
  const [selectedTags, setSelectedTags] = useState(['javascript', 'beginners', 'react']);

  const availableTags = [
    { name: 'webdev', posts: 267835 },
    { name: 'javascript', posts: 208349 },
    { name: 'ai', posts: 81327 },
    { name: 'beginners', posts: 149133 },
    { name: 'productivity', posts: 68282 },
    { name: 'python', posts: 70912 },
    { name: 'devops', posts: 60496 },
    { name: 'react', posts: 84948 },
    { name: 'opensource', posts: 49812 },
    { name: 'css', posts: 45678 },
    { name: 'nodejs', posts: 38945 },
    { name: 'tutorial', posts: 55432 }
  ];

  const toggleTag = (tagName) => {
    setSelectedTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(tag => tag !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };

  const handleContinue = () => {
    onContinue({ selectedTags });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            What are you interested in?
          </h1>
          <p className="text-gray-600 mb-2">Follow tags to customize your feed</p>
          <p className="text-sm text-gray-500">
            {selectedTags.length} tags selected
          </p>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.name);
            return (
              <button
                key={tag.name}
                onClick={() => toggleTag(tag.name)}
                className={`relative p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="font-semibold text-gray-900 mb-1">
                  #{tag.name}
                </div>
                <div className="text-sm text-gray-500">
                  {tag.posts.toLocaleString()} posts
                </div>
              </button>
            );
          })}
        </div>

        {/* Email Digest Option */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
          <div className="font-medium text-gray-900 mb-2">
            Get a Periodic Digest of Top Posts
          </div>
          <div className="text-sm text-gray-600">
            We'll email you with a curated selection of top posts based on the tags you follow.
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4">
            {/* Progress Dots */}
            <div className="flex space-x-2">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index + 1 === currentStep
                      ? 'bg-blue-600'
                      : index + 1 < currentStep
                      ? 'bg-gray-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestsSelection;