import { useState } from "react";

import SiteHeader from "../components/SiteHeader/SiteHeader";
import Button from "../components/CustomButton/CustomButton";

const MainLayout = ({ children }) => {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("💥 Intentional crash for testing ErrorBoundary!");
  }

  return (
    <div className="bg-background min-h-screen w-screen">
      {children}
    </div>
  );
};

export default MainLayout;