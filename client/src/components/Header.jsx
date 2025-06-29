import React from "react";
import { LogoutButton } from "./LogoutButton";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function Header() {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <header>
        <h1>Welcome back, {userInfo?.name}</h1>
        <LogoutButton />
      </header>
    </>
  );
}
