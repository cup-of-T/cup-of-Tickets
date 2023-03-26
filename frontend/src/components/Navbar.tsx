import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogOutButton";

export const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/">Home</Link>
        {isLoading && <Loader />}
        {!isAuthenticated && !isLoading && <LoginButton />}
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
