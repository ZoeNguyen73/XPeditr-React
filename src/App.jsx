import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SiteHeader from "./components/site-header/SiteHeader";

function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
