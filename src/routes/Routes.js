import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import PrivateRoute from "../PrivateRoute";
import Home from "../Screens/homescreen/Home"; // Ensure the correct path
import Login from "../Screens/loginScreen/Login"; // Ensure the correct path
import Signup from "../Screens/signupScreen/Signup"; // Ensure the correct path
import Dashboard from "../Screens/dashboardScreen/Dashboard"; // Ensure the correct path

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="" element={<Dashboard />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
