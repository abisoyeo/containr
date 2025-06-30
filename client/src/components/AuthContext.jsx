import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleLogin() {
    const returnTo = encodeURIComponent(window.location.href);
    window.location.href = `/api/login?returnTo=${returnTo}`;
  }

  async function handleLogout() {
    window.location.href = "/api/logout";
  }
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Complete user data:", userData);
        setUserInfo(userData);
        return userData;
      } else {
        console.log("Failed to fetch user profile");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth-status", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        if (data.isAuthenticated && data.user) {
          setIsAuthenticated(true);
          setUserInfo(data.user);
          console.log("User is authenticated:", data.user);
        } else {
          setIsAuthenticated(false);
          setUserInfo(null);
          console.log("User is not authenticated");
        }
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const contextValue = {
    handleLogin,
    handleLogout,
    isLoading,
    userInfo,
    isAuthenticated,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
