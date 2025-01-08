import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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