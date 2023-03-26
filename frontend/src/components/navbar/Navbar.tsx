import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton";
import { LogoutButton } from "../LogOutButton";
import './navbar.css';

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <nav className="navbar">
      <div className="container navbar__container center">
        <Link to="/">Home</Link>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <>
            <LogoutButton />
            <img className="navbar__avatar" src={user?.picture} />
          </>
        )}
      </div>
    </nav>
  );
};
