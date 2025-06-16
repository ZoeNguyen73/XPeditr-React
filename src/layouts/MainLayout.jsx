import { useState } from "react";

import SiteHeader from "../components/SiteHeader/SiteHeader";
import Button from "../components/CustomButton/CustomButton";

const MainLayout = ({ children }) => {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("💥 Intentional crash for testing ErrorBoundary!");
  }

  return (
    <div className="bg-background h-screen w-screen">
      <SiteHeader />

      {/* 🚨 Crash Test Button (dev only) */}
      {import.meta.env.DEV && (
        <div className="p-4">
          <Button
            handlePress={() => setCrash(true)}
            title="Crash the app"
            icon="🚨"
          />
        </div>
      )}

      {children}

    </div>
  );
};

export default MainLayout;