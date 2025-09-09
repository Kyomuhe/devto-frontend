import React from 'react';
import Header from '../components/header';
import SideMenu from '../components/sideMenu';
import sampleMenuItems from '../data/sampleData';


const Main = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu menuItems={sampleMenuItems} />
      
      <div className="ml-16">
        <Header />
      </div>
    </div>
  );
};

export default Main;