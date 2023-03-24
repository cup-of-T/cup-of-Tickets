import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';

interface ILoginButtonProps {
}

const LoginButton = ({ }: ILoginButtonProps) => {
    const { loginWithRedirect } = useAuth0();

    const LoginHandler = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                prompt: "login",
            },
        });
    };

    return (
        <button onClick={LoginHandler}>
            Log in
        </button>
    );
}

export default LoginButton;