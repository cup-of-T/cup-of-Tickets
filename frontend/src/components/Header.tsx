import LoginButton from "./LoginButton";
import { SignupButton } from "./SignUpButton";

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => {
    return (
        <header>
            <SignupButton />
            <LoginButton />
        </header>
    );
}

export default Header;