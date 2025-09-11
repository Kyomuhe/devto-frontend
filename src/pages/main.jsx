import React from 'react';
import Header from '../components/header';
import SideMenu from '../components/sideMenu';
import sampleMenuItems from '../data/sampleData';
import LeftSidebar from '../sections/LeftSidebar';
import RightSidebar from '../sections/RightSidebar';
import CenterContent from '../sections/CenterContent';

const Main = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu menuItems={sampleMenuItems} />
      
      <div className="ml-16">
        <Header />
        
        <div className="flex">
          <LeftSidebar />
          
          <CenterContent />

          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Main;
