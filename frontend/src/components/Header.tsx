import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogOutButton";
import './Header.css'

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => {
    const { isAuthenticated } = useAuth0();
    return (
        <header>
                <nav className="navbar">
                    <div className="container navbar__container">
                        <Link to="/">Home</Link>
                        {!isAuthenticated && <LoginButton />}
                        {isAuthenticated && <LogoutButton />}
                        <img src="" />
                    </div>
                </nav>
        </header>
    );
}

export default Header;