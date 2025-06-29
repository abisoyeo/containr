import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const LoginButton = () => {
  const { handleLogin } = useContext(AuthContext);

  return <button onClick={handleLogin}>Signup/Login</button>;
};
