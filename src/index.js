import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/Routes"; // Ensure this is the correct path to your AppRoutes component
import { AuthProvider } from "./AuthContext"; // Ensure this is the correct path to your AuthProvider
import "./index.css"; // Ensure this is the correct path to your CSS file

const rootElement = document.getElementById("root");

// Use createRoot instead of render
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
