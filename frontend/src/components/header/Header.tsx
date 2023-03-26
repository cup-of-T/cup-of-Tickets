import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import './Header.css'

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => {
    const { isAuthenticated, user } = useAuth0();
    return (
        <header className="header">
            <Sidebar />
            <Navbar />
        </header>
    );
}

export default Header;
