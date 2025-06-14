import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SiteHeader from "./components/site-header/SiteHeader";

function App() {

  // to test APP Crash:
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("💥 Intentional crash for testing ErrorBoundary!");
  }

  return (
    <div className="bg-background dark:bg-dark-background h-screen w-screen">
      <SiteHeader />

      {/* 🚨 Crash Test Button (dev only) */}
      {import.meta.env.DEV && (
        <div className="p-4">
          <button-default
            onClick={() => setCrash(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          >
            Crash the App
          </button-default>
        </div>
      )}
      
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
