import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const LogoutButton = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <button className="logout" onClick={handleLogout}>
      Sign Out
    </button>
  );
};
