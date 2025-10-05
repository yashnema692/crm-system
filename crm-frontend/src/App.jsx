// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const location = useLocation();

  useEffect(() => {
    // whenever the location changes or localStorage updates, re-check the role
    setRole(localStorage.getItem("role"));
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setRole={setRole} />} /> {/* pass setRole */}
        <Route
          path="/admin-dashboard"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-dashboard"
          element={role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
