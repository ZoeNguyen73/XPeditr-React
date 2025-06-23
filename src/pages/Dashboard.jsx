import { useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthProvider";

import ProfileSideBar from "../components/Dashboard/ProfileSideBar";
import MainContent from "../components/Dashboard/MainContent";

const Dashboard = () => {

  return (
    <div className="flex flex-row-nowrap gap-3 text-text p-10 h-screen">

      <div className="hidden lg:block flex-2 min-w-[280px] h-full overflow-hidden">
        <ProfileSideBar />
      </div>

      <div className="flex-7 rounded-xl h-full">
        <MainContent containerStyles="z-2"/>
      </div>
      <div className="hidden lg:block min-w-[280px] h-full overflow-hidden bg-sidebar rounded-xl h-full flex-3">
        <p> Sideboard right</p>
      </div>
    </div>
  )
};

export default Dashboard;