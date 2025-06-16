import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Register from "./pages/Register";
import Home from "./pages/Home";

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
