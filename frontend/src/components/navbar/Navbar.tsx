import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogOutButton";
import './navbar.css';
import { useContext, useEffect } from "react";
import { UsersContext } from "../../context/UsersProvider";
import { UsersContextType } from "../../types";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { users, fetchUsers } = useContext(UsersContext) as UsersContextType;
  const currentUser = users.find(u => u.email === user?.email);


  console.log(users);
  return (
    <nav className="navbar">
      <div className="container navbar__container center">
        <Link className="btn" to="/">Home</Link>
        {isLoading && <Loader />}
        {!isAuthenticated && !isLoading && <LoginButton />}
        {isAuthenticated && (
          <>
            <LogoutButton />
            <img className="navbar__avatar" src={currentUser?.imageUrl} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;