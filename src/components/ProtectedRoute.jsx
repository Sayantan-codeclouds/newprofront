/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/denied" />;
  }
  return children;
}

const handleLoginSuccess = async (credentialResponse) => {
  try {
    const response = await fetch("http://localhost:5000/auth/google/callback", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credentialResponse.credential}`,
      },
    });

    const data = await response.json();
    console.log("Backend response:", data);

    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
      Navigate("/welcome");
    } else {
      console.log("No token received");
      throw new Error("Access denied");
    }
  } catch (error) {
    console.error(error);
    Navigate("/denied"); // Redirect to Denied page if login fails
  }
};

export default ProtectedRoute;
