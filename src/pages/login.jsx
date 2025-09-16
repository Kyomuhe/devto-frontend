import React, { useState } from 'react';
import { Apple, Facebook, Github, Chrome, Twitter } from 'lucide-react';
import logo from '../assets/logo.webp';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        onLoginSuccess(data);
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
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
          <img className="mx-auto h-12 w-auto" src={logo} alt="DEV Community Logo" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in with your username</p>
        </div>

        {/* Show error */}
        {error && (
          <div className="text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Social Login */}
        <div className="space-y-3">
          {socialButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-50 transition-colors duration-200"
            >
              <button.icon className={`w-5 h-5 ${button.color}`} />
              <span className="absolute text-black left-1/2 transform -translate-x-1/2">
                {button.text}
              </span>
              <span className="w-5" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
