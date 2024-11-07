/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./components/GoogleLoginButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Denied from "./pages/Denied";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route path="/denied" element={<Denied />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
