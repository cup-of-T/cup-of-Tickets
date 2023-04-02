import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import './Header.css'

interface IHeaderProps {
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>
}

const Header = ({ setSelectedTeam }: IHeaderProps) => {
    const { isAuthenticated, user } = useAuth0();
    return (
        <header className="header">
            <Sidebar />
            <Navbar setSelectedTeam={setSelectedTeam} />
        </header>
    );
}

export default Header;
