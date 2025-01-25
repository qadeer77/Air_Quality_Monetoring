import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure the correct path

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    children || <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
