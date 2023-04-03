import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../loader/Loader";
import LogoutButton from "../buttons/LogOutButton";
import './navbar.css';
<<<<<<< HEAD
import { useContext } from "react";
=======
import { SyntheticEvent, useContext, useEffect } from "react";
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
import { UserContext } from "../../context/UserProvider";
import { UserContextType } from "../../types";
import { Link } from "react-router-dom";

<<<<<<< HEAD
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
            {dbUser?.imageUrl != null && <Link to='/settings'><img className="navbar__avatar"
              src={import.meta.env.VITE_API_SERVER_URL + '/Images/' + dbUser?.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/default_pfp.png";
              }} /></Link>}
          </>
        )}
=======
type NavbarProps = {
  setSelectedTeam: React.Dispatch<React.SetStateAction<number>>
}

const Navbar = ({ setSelectedTeam }: NavbarProps) => {
  const { dbUser } = useContext(UserContext) as UserContextType;

  if (dbUser == null || dbUser.teams == null) return (<Loader />)

  const handleTeamChange = (e: SyntheticEvent) => {
    const value = e.target as HTMLInputElement;
    setSelectedTeam(parseInt(value.value, 10));
  }

  

  return (
    <nav className="navbar">
      <div className="container navbar__container center">
        <select className='navbar__teams' onChange={handleTeamChange}>
          {dbUser.teams?.map(team =>
            <option key={team.teamId} value={team.teamId}>{team.name}</option>)}
        </select>
        <div className="navbar__links">
          <LogoutButton />
          {dbUser?.imageUrl == null && <Loader />}
          {dbUser?.imageUrl != null && <Link to='/settings'><img className="navbar__avatar"
            src={import.meta.env.VITE_API_SERVER_URL + '/Images/' + dbUser?.imageUrl}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/default_pfp.png";
            }} /></Link>}
        </div>
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
      </div>
    </nav>
  );
};

export default Navbar;