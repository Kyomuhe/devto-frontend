import React from 'react';
import HeaderLoggedin from '../components/headerLoggedin';
import SideMenu from '../components/sideMenu';
import sampleMenuItems from '../data/sampleData';
import LeftSidebar from '../sections/LeftSidebar';
import RightSidebar from '../sections/RightSidebar';
import OnBoard from '../components/onBoard';
import ActiveDiscussions from '../components/activeDisscussions';

const MainLoggedin = () => {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu menuItems={sampleMenuItems} />
      
      <div className="ml-16">
        <HeaderLoggedin />
        
        <div className="flex">
          <LeftSidebar />

          <OnBoard/>

          <div className='flex flex-col'>
            <ActiveDiscussions />
            <RightSidebar />
          </div>
    

        </div>
      </div>
    </div>
  );
};

export default MainLoggedin;
