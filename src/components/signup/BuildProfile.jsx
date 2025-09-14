import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const BuildProfile = ({ onContinue, currentStep = 1, totalSteps = 5 }) => {
  // Dummy user data 
  const [userData, setUserData] = useState({
    name: 'KYOMUHENDO PRECIOUS',
    username: 'precious_kay',
    bio: '',
    profileImage: '/assets/profile1.jpeg'
  });

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    // Pass user data to parent component
    onContinue(userData);
  };

  const handleImageEdit = () => {
    // Handle profile image editing
    console.log('Edit profile image clicked');
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Build your profile
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Tell us a little bit about yourself — this is how others will see you on DEV
            Community. You'll always be able to edit this later in your Settings.
          </p>
        </div>

        {/* Profile Image Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
            />
            <button
              onClick={handleImageEdit}
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
            >
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {userData.name}
            </h3>
            <button
              onClick={handleImageEdit}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit profile image
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={userData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us a little about yourself"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Progress and Continue */}
        <div className="mt-8 flex items-center justify-between">
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
  );
};

export default BuildProfile;