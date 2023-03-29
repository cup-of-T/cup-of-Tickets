import { useAuth0 } from '@auth0/auth0-react';
interface ILoginButtonProps {
}

const LoginButton = ({ }: ILoginButtonProps) => {
    const { loginWithRedirect } = useAuth0();

    const LoginHandler = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/",
            },
            authorizationParams: {
                prompt: "login",
            },
        });
    };

    return (
        <button className="btn btn--blue btn--large" onClick={LoginHandler}>
            Proceed to login
        </button>
    );
}

export default LoginButton;