import React from 'react';
import { 
  Smile, 
  Phone, 
  Database, 
  Zap, 
  ShoppingBag, 
  FileText, 
  Shield, 
  User,
  Twitter,
  Github,
  Instagram,
  Twitch,
  MessageSquare,
  MoreHorizontal
} from 'lucide-react';
import devcommun from '../assets/devcommun.png';

const LeftSidebar = () => {
  return (
    <div className="w-80 p-4 space-y-6 overflow-y-auto">
      {/* DEV Community Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          DEV Community is a community of 3,462,852 amazing developers
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We're a place where coders share, stay up-to-date and grow their careers.
        </p>
        
        <div className="space-y-3">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
            Create account
          </button>
          <button className="w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 py-2 px-4 rounded-md font-medium transition-colors duration-200">
            Log in
          </button>
        </div>
      </div>

      {/* Navigation Links Card */}
      <div className="overflow-hidden">
        {/* Main Links */}
        <div className="p-4 space-y-2">
          <NavLink icon={<Smile className="w-5 h-5 text-yellow-500" />} text="About" />
          <NavLink icon={<Phone className="w-5 h-5 text-orange-500" />} text="Contact" />
          <NavLink icon={<Database className="w-5 h-5 text-blue-500" />} text="Free Postgres Database" />
          <NavLink icon={<Zap className="w-5 h-5 text-orange-500" />} text="Software comparisons" />
          <NavLink icon={<ShoppingBag className="w-5 h-5 text-purple-500" />} text="Forem Shop" />
        </div>

        {/* Other Section */}
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Other</h3>
          <div className="space-y-2">
            <NavLink icon={<FileText className="w-5 h-5 text-yellow-500" />} text="Code of Conduct" />
            <NavLink icon={<Shield className="w-5 h-5 text-yellow-500" />} text="Privacy Policy" />
            <NavLink icon={<User className="w-5 h-5 text-gray-500" />} text="Terms of Use" />
          </div>
        </div>
      </div>

      {/* Social Links Card */}
      <div >
        <div className="flex flex-wrap gap-4 justify-center">
          <SocialIcon icon={<Twitter className="w-6 h-6" />} />
          <SocialIcon icon={<Github className="w-6 h-6" />} />
          <SocialIcon icon={<Instagram className="w-6 h-6" />} />
          <SocialIcon icon={<Twitch className="w-6 h-6" />} />
          <SocialIcon icon={<MessageSquare className="w-6 h-6" />} />
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
        <div className="space-y-2">
          <TagItem tag="webdev" posts="82,584 posts published" />
          <TagItem tag="beginners" posts="75,320 posts published" />
          <TagItem tag="programming" posts="45,123 posts published" />
          <TagItem tag="tutorial" posts="38,901 posts published" />
          <TagItem tag="react" posts="35,847 posts published" />
          <TagItem tag="python" posts="32,156 posts published" />
          <TagItem tag="javascript" posts="89,234 posts published" />
          <TagItem tag="css" posts="25,789 posts published" />
        </div>
      </div>

{/* DEV Diamond Sponsors */}
<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
  <div className="flex items-center space-x-2 mb-4">
    <div className="w-4 h-4 bg-blue-500 transform rotate-45"></div>
    <h3 className="text-lg font-bold text-gray-900">DEV Diamond Sponsors</h3>
  </div>
  
  <p className="text-sm text-gray-600 mb-6">
    Thank you to our Diamond Sponsors for supporting the DEV Community
  </p>
  
  <div className="space-y-6">
    {/* Google AI Sponsor */}
    <div className="text-center">
      <h4 className="text-3xl font-bold text-gray-900 mb-2">Google AI</h4>
      <p className="text-sm text-gray-600 italic">
        Google AI is the official AI Model and Platform Partner of DEV
      </p>
    </div>
    
    {/* NEON Sponsor */}
    <div className="text-center border-t border-gray-100 pt-6">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="w-6 h-6 bg-green-400 rounded"></div>
        <h4 className="text-2xl font-bold text-gray-900">NEON</h4>
      </div>
      <p className="text-sm text-gray-600 italic">
        Neon is the official database partner of DEV
      </p>
    </div>
  </div>
</div>


{/* DEV Community Join Card */}
<div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
  <div className="flex items-center justify-between p-3 border-b border-gray-200">
    <h3 className="font-semibold text-gray-900">DEV Community</h3>
    <button className="text-gray-400 hover:text-gray-600">
      <MoreHorizontal className="w-5 h-5" />
    </button>
  </div>
  
  <div className="p-4">
    <div className="relative">
      <img
        src={devcommun}
        alt="Join the DEV Community"
        className="w-full h-auto rounded-lg"
      />
    </div>
  </div>
</div>

{/* Footer */}
<div className="text-sm text-gray-600 leading-relaxed">
  <p className="mb-3">
    <span className="text-blue-600 font-medium hover:underline cursor-pointer">DEV Community</span>{' '}
    A space to discuss and keep up software development and manage your software career
  </p>
  
  <p className="mb-3">
    Built on{' '}
    <span className="text-blue-600 font-medium hover:underline cursor-pointer">Forem</span>
    {' '}— the{' '}
    <span className="text-blue-600 font-medium hover:underline cursor-pointer">open source</span>
    {' '}software that powers DEV and other inclusive communities.
  </p>
  
  <p>
    Made with love and{' '}
    <span className="text-blue-600 font-medium hover:underline cursor-pointer">Ruby on Rails</span>.
    DEV Community © 2016 - 2025.
  </p>
</div>


</div>
  );
};

// Navigation Link Component
const NavLink = ({ icon, text }) => (
  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
    {icon}
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

// Social Icon Component
const SocialIcon = ({ icon }) => (
  <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-150 text-gray-600 hover:text-gray-900">
    {icon}
  </div>
);

// Tag Item Component
const TagItem = ({ tag, posts }) => (
  <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
    <span className="text-gray-700 font-medium">#{tag}</span>
    <span className="text-xs text-gray-500">{posts}</span>
  </div>
);

// Help Item Component
const HelpItem = ({ title, author, comments }) => (
  <div className="p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
    <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
    <div className="flex justify-between items-center text-xs text-gray-500">
      <span>{author}</span>
      <span>{comments}</span>
    </div>
  </div>
);

export default LeftSidebar;