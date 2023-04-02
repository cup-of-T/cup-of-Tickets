import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../loader/Loader";
import LogoutButton from "../buttons/LogOutButton";
import './navbar.css';
import { SyntheticEvent, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { UserContextType } from "../../types";
import { Link } from "react-router-dom";

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
      </div>
    </nav>
  );
};

export default Navbar;