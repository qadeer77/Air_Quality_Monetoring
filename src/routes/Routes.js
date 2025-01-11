import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Dashboard } from "../Screens/index";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/forgot-password"
          component={() => <div>Forgot Password Page</div>}
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
