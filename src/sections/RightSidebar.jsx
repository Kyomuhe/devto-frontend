import React from 'react';
import { Hand, MoreHorizontal, Rocket } from 'lucide-react';
import google from '../assets/google.webp';

const RightSidebar = () => {
  return (
    <div className="w-80 p-4 space-y-6 overflow-y-auto">
      {/* What's happening this week */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Hand className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900">What's happening this week</h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <h4 className="text-xl font-semibold text-gray-900">Challenges</h4>
            <span className="text-xl">😊</span>
          </div>
          
          {/* Challenge Card */}
          <div className="border-2 border-black-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-gray-700">Just Launched</span>
              <Rocket className="w-4 h-4 text-red-500" />
            </div>
            
            <div className="mb-3">
              <img
                src={google}
                alt="Google AI Challenge"
                className="w-full rounded-lg"
              />
            </div>
            
            <h5 className="text-blue-600 font-semibold text-lg mb-2 hover:underline cursor-pointer">
              Google AI Multimodal Challenge: $3,000 in Prizes!
            </h5>
            
            <p className="text-gray-600 text-sm italic">
              Build and deploy an applet on Google AI Studio!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-2">#discuss</h3>
        <p className="text-gray-600 text-sm mb-4">
          Discussion threads targeting the whole community
        </p>
        
        <div className="space-y-4">
          <DiscussionItem
            title="Meme Monday"
            comments="76 comments"
            isNew={false}
          />
          
          <DiscussionItem
            title="How to Make Your Data Science Project the Beyoncé of the Boardroom"
            comments=""
            isNew={true}
          />
          
          <DiscussionItem
            title="In Defense of C++"
            comments=""
            isNew={true}
          />
          
          <DiscussionItem
            title="How to Write Cleaner Code by Thinking Like an Architect"
            comments="7 comments"
            isNew={false}
          />
        </div>
      </div>

    </div>
  );
};

// Discussion Item Component
const DiscussionItem = ({ title, comments, isNew }) => (
  <div className="py-2">
    <h4 className="text-gray-900 font-medium mb-1 hover:text-blue-600 cursor-pointer">
      {title}
    </h4>
    <div className="flex items-center space-x-2">
      {comments && (
        <span className="text-sm text-gray-500">{comments}</span>
      )}
      {isNew && (
        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
          New
        </span>
      )}
    </div>
  </div>
);

export default RightSidebar;