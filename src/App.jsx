import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SiteHeader from "./components/site-header/SiteHeader";

function App() {
  return (
    <div className="bg-background dark:bg-dark-background h-screen w-screen">
      <SiteHeader />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
