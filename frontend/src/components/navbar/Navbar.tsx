import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogOutButton";
import './navbar.css';
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { UserContextType } from "../../types";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { dbUser } = useContext(UserContext) as UserContextType;
  return (
    <nav className="navbar">
      <div className="container navbar__container center">
        <Link className="btn" to="/">Home</Link>
        {isLoading && <Loader />}
        {!isAuthenticated && !isLoading && <LoginButton />}
        {isAuthenticated && (
          <>
            <LogoutButton />
            <img className="navbar__avatar" src={dbUser?.imageUrl} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;