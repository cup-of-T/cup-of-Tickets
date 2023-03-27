import { Auth0Provider, AppState, useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { getUserByEmail, postUser } from "../services/userApi";
import { TicketsContextType, UserContextType } from "../types";

interface AuthProviderProps {
    children: React.ReactNode
}


const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();

    const onRedirectCallback = (appState?: AppState) => {
        const getOrPostUser = async () => {
            const accessToken = await getAccessTokenSilently();
            let dbUser = await getUserByEmail(user?.email, accessToken);
            if (dbUser == null) {
                dbUser = await postUser(accessToken);
            }
            if (dbUser == null) {
                navigate('/403');
            }
            const { setDbUser } = useContext(UserContext) as UserContextType;
            setDbUser(dbUser);
        }
        getOrPostUser();
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(import.meta.env.VITE_AUTH0_DOMAIN && import.meta.env.VITE_AUTH0_CLIENT_ID && import.meta.env.VITE_AUTH0_CALLBACK_URL && import.meta.env.VITE_AUTH0_AUDIENCE)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
}

export default AuthProvider;