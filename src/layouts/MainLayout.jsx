import { useState } from "react";

// import SiteHeader from "../components/SiteHeader/SiteHeader";
// import Button from "../components/CustomButton/CustomButton";
import ThemeToggle from "../components/ThemeToggle";

const MainLayout = ({ children }) => {

  return (
    <div className="bg-background min-h-screen w-screen">
      <ThemeToggle containerStyles={"absolute top-2 right-2 z-100"}/>
      {children}
    </div>
  );
};

export default MainLayout;