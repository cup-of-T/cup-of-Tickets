import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogOutButton";
import './Header.css'

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => {
    const { isAuthenticated, user } = useAuth0();
    return (
        <header>
                <nav className="navbar">
                    <div className="container navbar__container">
                        <Link to="/">Home</Link>
                        {!isAuthenticated && <LoginButton />}
                        {isAuthenticated && <>
                        <LogoutButton />
                        <img className="navbar__avatar" src={user?.picture} />
                        </>}
                    </div>
                </nav>
        </header>
    );
}

export default Header;