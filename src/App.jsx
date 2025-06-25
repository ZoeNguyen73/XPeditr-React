import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// auth pages
import Register from "./pages/Register";
import Activate from "./pages/Activate";
import ProfileSetup from "./pages/ProfileSetup";
import LogIn from "./pages/LogIn";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";

function App() {

  return (
    <Routes>
      <Route 
        path="/register" 
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      <Route 
        path="/activate/:activateToken"
        element={
          <AuthLayout>
            <Activate />
          </AuthLayout>
        }
      />
      
      <Route 
        path="/profile-setup"
        element={
          <AuthLayout>
            <ProfileSetup />
          </AuthLayout>
        }
      />

      <Route 
        path="/login"
        element={
          <AuthLayout>
            <LogIn />
          </AuthLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/quests"
        element={
          <MainLayout>
            <Quests />
          </MainLayout>
        }
      />

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default App;
