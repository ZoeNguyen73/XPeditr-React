import { useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthProvider";

import ProfileSideBar from "../components/Dashboard/ProfileSideBar";
import MainContent from "../components/Dashboard/MainContent";
import SideContent from "../components/Dashboard/SideContent";
import NavBar from "../components/SiteHeader/NavBar";

const Dashboard = () => {

  return (

    <div className="relative flex flex-row-nowrap gap-3 text-text pt-15 px-8 pb-8 h-screen">
      <NavBar containerStyles="absolute top-0 left-0 pr-33"/>

      <div className="hidden lg:block flex-2 min-w-[280px] overflow-hidden">
        <ProfileSideBar />
      </div>

      <div className="flex-7 rounded-xl h-full">
        <MainContent />
      </div>
      <div className="hidden lg:block min-w-[280px] h-full overflow-hidden bg-sidebar rounded-xl h-full flex-3">
        <SideContent />
      </div>
    </div>
    
  )
};

export default Dashboard;