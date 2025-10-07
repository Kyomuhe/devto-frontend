import { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import MenuPopup from '../models/MenuPopup';

const SideMenu = ({ menuItems = [] }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: rect.right + 2,
      y: rect.top,
    });
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-14 bg-gray-100 border-r border-gray-200 z-40 group">
      {/* Scrollable container */}
      <div className="
        h-full 
        overflow-y-hidden 
        group-hover:overflow-y-auto
        scrollbar-thin 
        scrollbar-thumb-gray-300 
        scrollbar-track-transparent 
        py-2
      ">
        <div className="flex flex-col items-center space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={item.id || index}
              className="relative"
              onMouseEnter={(e) => handleMouseEnter(item, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {hoveredItem?.id === item.id && (
                <MenuPopup
                  item={hoveredItem}
                  position={mousePosition}
                  onClose={() => setHoveredItem(null)}
                />
              )}

              {index < menuItems.length - 1 && (
                <div className="w-8 h-px bg-gray-300 mx-auto my-2"></div>
              )}
            </div>
          ))}

          {/* Add button */}
          <div className="w-8 h-px bg-gray-300 mx-auto my-2"></div>
          <div className="w-12 h-12 flex items-center justify-center">
            <Plus className="w-6 h-6 text-blue-600 hover:text-blue-500" />
          </div>

          {/* More options */}
          <div className="w-8 h-px bg-gray-300 mx-auto my-2"></div>
          <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-all duration-200">
            <MoreHorizontal className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
