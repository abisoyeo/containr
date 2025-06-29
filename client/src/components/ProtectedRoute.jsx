import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
