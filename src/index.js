import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from ReactDOM
import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider

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
