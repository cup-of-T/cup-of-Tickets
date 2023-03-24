import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    const SignUpHandler = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                prompt: "login",
                screen_hint: "signup",
            },
        });
    };

    return (
        <button onClick={SignUpHandler}>
            Sign Up
        </button>
    );
};
