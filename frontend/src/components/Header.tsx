import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogOutButton";
import { SignupButton } from "./SignUpButton";

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => {
    const { isAuthenticated } = useAuth0();
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
        </header>
    );
}

export default Header;