import React from 'react';
import { Apple, Facebook, Github, Chrome, Twitter, Mail } from 'lucide-react';
import logo from '../assets/logo.webp';
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
  const navigate = useNavigate();
  const socialButtons = [
    { icon: Apple, text: 'Sign up with Apple', color: 'text-gray-800' },
    { icon: Facebook, text: 'Sign up with Facebook', color: 'text-blue-600' },
    { icon: Github, text: 'Sign up with GitHub', color: 'text-gray-800' },
    { icon: Chrome, text: 'Sign up with Google', color: 'text-gray-600' },
    { icon: Twitter, text: 'Sign up with Twitter (X)', color: 'text-gray-800' },
    { icon: Mail, text: 'Sign up with Email', color: 'text-gray-800', route: '/email-signup' }
  ];

  const handleSocialSignup = (button) => {
    if (button.route) {
      navigate(button.route); 
    } else {
      console.log('Signup with:', button.text);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src= {logo}
              alt="DEV Community Logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join the DEV Community
          </h1>
          <p className="text-gray-600">
            DEV Community is a community of 3,465,300 amazing developers
          </p>
        </div>

        {/* Social Signup Buttons */}
<div className="space-y-3">
  {socialButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleSocialSignup(button)}
              className="relative w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-50 transition-colors duration-200"
            >
      <button.icon className={`w-5 h-5 ${button.color}`} />

      <span className="absolute text-black left-1/2 transform -translate-x-1/2">
        {button.text}
      </span>

      <span className="w-5" />
    </button>
  ))}
</div>
        {/* Footer */}
        <div className="text-center space-y-4 pt-6">
          <p className="text-gray-500 leading-relaxed">
            By signing up, you are agreeing to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              privacy policy
            </a>
            ,{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              terms of use
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              code of conduct
            </a>
            .
          </p>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                Log in.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;