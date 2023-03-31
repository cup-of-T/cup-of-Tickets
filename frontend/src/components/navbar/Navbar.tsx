import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../loader/Loader";
import LogoutButton from "../buttons/LogOutButton";
import './navbar.css';
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { UserContextType } from "../../types";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { dbUser } = useContext(UserContext) as UserContextType;
  return (
    <nav className="navbar">
      <div className="container navbar__container center">
        {isLoading && <Loader />}
        {isAuthenticated && (
          <>
            <LogoutButton />
            {dbUser?.imageUrl == null && <Loader />}
            {dbUser?.imageUrl != null && <Link to='/profile'><img className="navbar__avatar"
              src={dbUser?.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/default_pfp.png";
              }} /></Link>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;