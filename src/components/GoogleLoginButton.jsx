/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/google/callback",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${credentialResponse.credential}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("User not allowed");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        // Store token in localStorage and redirect to welcome page
        localStorage.setItem("token", token);
        navigate("/welcome");
      } else {
        throw new Error("Access denied");
      }
    } catch (error) {
      console.error(error);
      navigate("/denied"); // Redirect to Denied page if login fails
    }
  };

  const handleLoginError = () => {
    console.log("Login failed");
  };

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
  );
}

export default GoogleLoginButton;
