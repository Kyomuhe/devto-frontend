import React, { useState } from 'react';
import { Apple, Facebook, Github, Chrome, Twitter } from 'lucide-react';
import logo from '../assets/logo.webp';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic will be handled here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  const socialButtons = [
    { icon: Apple, text: 'Continue with Apple', color: 'text-gray-800' },
    { icon: Facebook, text: 'Continue with Facebook', color: 'text-blue-600' },
    { icon: Github, text: 'Continue with GitHub', color: 'text-gray-800' },
    { icon: Chrome, text: 'Continue with Google', color: 'text-gray-600' },
    { icon: Twitter, text: 'Continue with Twitter (X)', color: 'text-gray-800' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
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

        {/* Social Login Buttons */}
<div className="space-y-3">
  {socialButtons.map((button, index) => (
    <button
      key={index}
      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-50 transition-colors duration-200"
    >
      <button.icon className={`w-5 h-5 ${button.color}`} />

      <span className="absolute text-black left-1/2 transform -translate-x-1/2">
        {button.text}
      </span>

      {/* Empty spacer to balance flex */}
      <span className="w-5" />
    </button>
  ))}
</div>

        {/* OR Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            By signing in, you are agreeing to our{' '}
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
          <p className="text-sm text-gray-600">
            New to DEV Community?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
              Create account.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;