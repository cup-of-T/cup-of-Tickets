import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogOutButton";
import './Header.css'
import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./navbar/Navbar";

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => (
    <header>
        <Navbar />
        <Sidebar />
    </header>
);


export default Header;
