import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import signup from '../../assets/signup.png';

const NewsletterSubscription = ({ onFinish, onBack, currentStep = 4, totalSteps = 5 }) => {
  const data = useSignupStore((state) => state.signupData)
  console.log(data)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);

  const handleFinish = () => {
    udateSignupData({subscribeToNewsletter})
    onFinish({ subscribeToNewsletter });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <img
            src={signup}
            alt="DEV Community Illustration"
            className="w-full max-w-md mx-auto mb-6 rounded-lg"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Informed with DEV Community
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg">
            Subscribe to our weekly newsletter for top articles, trending discussions,
            community updates, and occasional news about DEV Challenges and events.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
          <div className="flex items-start space-x-4">
            <input
              type="checkbox"
              checked={subscribeToNewsletter}
              onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Yes, subscribe me to the weekly newsletter
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Rest assured, we respect your privacy. Your email will only be used for our newsletter
                and occasional updates, and won't be shared with others.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
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

            <button
              onClick={handleFinish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;