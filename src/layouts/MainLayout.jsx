import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const MainLayout = () => {

  return (
    <div className="bg-background min-h-screen w-screen">
      <ThemeToggle containerStyles={"absolute top-2 right-10 z-100"}/>
      <Outlet />
    </div>
  );
};

export default MainLayout;