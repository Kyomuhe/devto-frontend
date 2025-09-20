import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, Bell } from 'lucide-react';
import logo from '../assets/logo.webp';
import { useNavigate } from "react-router-dom";
import ProfileModal from '../models/profileModel';
import defaultAvator from '../assets/default.png';

const HeaderLoggedin = ({ user,handleLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header className="bg-white border-b border-gray-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="DEV" className="h-8 w-auto" />
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

          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              onClick={() => navigate("/create-post")}
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Create Post
            </button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />

            {/* Profile Avatar + Modal */}
            <div ref={profileRef} className="relative">
<img
  src={user?.id ? `http://localhost:8081/api/auth/user/${user.id}/profile-image` : defaultAvator}
  alt="User Avatar"
  className="w-8 h-8 rounded-full cursor-pointer"
  onClick={toggleProfile}
  onError={(e) => { e.target.src = defaultAvator; }}
/>
              <ProfileModal
                open={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                name={user?.Name || "No Name"}        
                username={user?.username || "unknown"}
                onDashboard={() => navigate("/dashboard")}
                onCreatePost={() => navigate("/create-post")}
                onReadingList={() => navigate("/reading-list")}
                onSettings={() => navigate("/settings")}
                onSignOut={() => {
                  handleLogout();
                  setIsProfileOpen(false);
                }

              }
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoggedin;
