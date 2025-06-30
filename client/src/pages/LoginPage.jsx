import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";
import { LoginButton } from "../components/LoginButton";

export default function LoginPage() {
  const { isAuthenticated, isLoading, userInfo } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="text-center">
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (isAuthenticated && userInfo && !isLoading) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-container">
      <div className="text-center">
        <h1>Welcome to Express Todo</h1>
        <LoginButton />
      </div>
    </div>
  );
}
