import React from 'react';
import HeaderLoggedin from '../components/headerLoggedin';
import SideMenu from '../components/sideMenu';
import sampleMenuItems from '../data/sampleData';
import LeftSidebar from '../sections/LeftSidebar';
import RightSidebar from '../sections/RightSidebar';
import OnBoard from '../components/onBoard';
import ActiveDiscussions from '../components/activeDisscussions';

const MainLoggedin = ({ onLogout, userToken, user }) => {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu 
        menuItems={sampleMenuItems} 
        onLogout={onLogout}
      />
      
      <div className="ml-16">
        <HeaderLoggedin 
          handleLogout={onLogout}
          userToken={userToken}
          user={user}   

        />
        
        <div className="flex">
          <LeftSidebar />

          <OnBoard
            handleLogout={onLogout}
            userToken={userToken}
            user={user} 
/>

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