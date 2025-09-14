import React, { useState } from 'react';
import { Search,Menu, X, Bell } from 'lucide-react';
import logo from '../assets/logo.webp';
import { useNavigate } from "react-router-dom";


const HeaderLoggedin = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={logo}
              alt="DEV"
              className="h-8 w-auto"
            />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-800" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-28 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs text-gray-400">Powered by Algolia</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
            onClick ={() => navigate("/create-post")} 
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Create Post
            </button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            <img
              src="/assets/profile1.jpeg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-28 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-xs text-gray-400">Powered by Algolia</span>
                </div>
              </div>
            </div>
            
            <button
            onClick ={() => navigate("/create-post")} 
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Create Post
            </button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            <img
              src="/assets/profile1.jpeg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLoggedin;