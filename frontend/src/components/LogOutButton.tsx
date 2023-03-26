import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    const LogoutHandler = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return (
        <button className="btn btn--bordered" onClick={LogoutHandler}>
            Log Out
        </button>
    );
};
