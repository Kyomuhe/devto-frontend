import React from 'react';

const MenuPopup = ({ item, position }) => {
  if (!item) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-0 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateY(-20px)'
      }}
    >
      {/* Header Image */}
      <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative overflow-hidden">
        {item.headerImage ? (
          <img
            src={item.headerImage}
            alt={`${item.title} header`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Profile Image and Title */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-white shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Follow Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mb-3">
          Follow
        </button>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description || 'No description available.'}
        </p>

        {/* Additional Info */}
        {item.members && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">{item.members} members</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPopup;
