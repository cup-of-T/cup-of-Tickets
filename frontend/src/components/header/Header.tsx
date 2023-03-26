import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { Sidebar } from "../sidebar/Sidebar";
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
