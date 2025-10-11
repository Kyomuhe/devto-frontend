import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import useSignupStore from '../../store/storage';

const SpecialInitiatives = ({ onContinue, onBack, currentStep = 3, totalSteps = 5 }) => {
  const data = useSignupStore((state) => state.signupData)
  console.log(data)
  const [selectedInitiatives, setSelectedInitiatives] = useState([]);

  const initiatives = [
    {
      id: 'challenges',
      title: 'Follow DEV Challenges',
      description: 'We offer special coding challenges, hackathons and writing challenges to help you sharpen your skills and win prizes.'
    },
    {
      id: 'education',
      title: 'Follow DEV Education Tracks',
      description: 'Get curated educational content and tutorials on a variety of development topics.'
    },
    {
      id: 'google-ai',
      title: 'Follow the Google AI Org Account',
      description: 'We have partnered with Google AI on custom education tracks for upgrading your skills in AI and machine learning.'
    }
  ];

  const toggleInitiative = (initiativeId) => {
    setSelectedInitiatives(prev => {
      if (prev.includes(initiativeId)) {
        return prev.filter(id => id !== initiativeId);
      } else {
        return [...prev, initiativeId];
      }
    });
  };

  const handleContinue = () => {
    updateSignupData({selectedInitiatives})
    onContinue({ selectedInitiatives });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Special Initiatives
          </h1>
          <p className="text-gray-600 leading-relaxed">
            DEV offers exclusive events that help you grow as a developer and certify
            your skills. Follow these special tags to make sure you never miss an
            update.
          </p>
        </div>

        {/* Initiatives List */}
        <div className="space-y-4 mb-8">
          {initiatives.map((initiative) => {
            const isSelected = selectedInitiatives.includes(initiative.id);
            return (
              <div
                key={initiative.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleInitiative(initiative.id)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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

export default SpecialInitiatives;