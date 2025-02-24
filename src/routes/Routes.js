import React from "react";
import { Route, Routes } from "react-router-dom";
// Remove the unused PrivateRoute if not in use
// import PrivateRoute from "../components/PrivateRoute";
import Login from "../Screens/loginScreen/Login";
import Dashboard from "../Screens/dashboardScreen/Dashboard";

const RoutesComponent = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default RoutesComponent;
