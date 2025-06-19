import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import { useAuthContext } from "../context/AuthProvider";
import { useThemeContext } from "../context/ThemeProvider";

import Avatar from "../components/Avatar/Avatar";
import ProfileSideBar from "../components/Dashboard/ProfileSideBar";

import images from "../constants/images";

const Dashboard = () => {
  const { auth } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();

  const bgImg = theme === "dark"
    ? "bg_purple_sky"
    : "bg_mint_sky";

  return (
    <div className="flex flex-row-nowrap gap-3 text-text p-10 h-screen">

      <div className="flex-2 min-w-[280px]">
        <ProfileSideBar />
      </div>

      <div className="flex-7 bg-background rounded-xl h-full">
        <p> Main</p>
      </div>
      <div className="bg-sidebar rounded-xl h-full flex-4">
        <p> Sideboard right</p>
      </div>
    </div>
  )
};

export default Dashboard;