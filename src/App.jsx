import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "react-day-picker/style.css";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// auth pages
import Register from "./pages/Register";
import Activate from "./pages/Activate";
import ProfileSetup from "./pages/ProfileSetup";
import LogIn from "./pages/LogIn";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests/Quests";
import CreateQuest from "./pages/Quests/CreateQuest";

function App() {

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {/* <Route index element={<Quests />} /> */}
        <Route path="activate/:activateToken" element={<Activate />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
      </Route>

      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/quests" element={<MainLayout />}>
        <Route index element={<Quests />} />
        <Route path="create" element={<CreateQuest />} />
      </Route>

      <Route path="/" element={<MainLayout />} >
      <Route index element={<Home />} />
      </Route>

    </Routes>
  );
}

export default App;
