import { Auth0Provider, AppState, useAuth0 } from "@auth0/auth0-react";
import { InteractiveBrowserCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: React.ReactNode
}


const vaultName = "ticketVault";
const url = `https://${vaultName}.vault.azure.net`;

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [domain, setDomain] = useState<string | null>();

    useEffect(() => {
        const getAuth0Domain = async () => {
            const credential = new InteractiveBrowserCredential();
            const client = new SecretClient(url, credential);
            const auth0Domain = await client.getSecret("vite-auth0-domain");
            setDomain(auth0Domain.value!);
        };
        getAuth0Domain();
    }, []);

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!domain || !import.meta.env.VITE_AUTH0_CLIENT_ID || !import.meta.env.VITE_AUTH0_CALLBACK_URL || !import.meta.env.VITE_AUTH0_AUDIENCE) {
        return null;
    }

    return (
        <>
            <Auth0Provider
                domain={domain}
                clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                authorizationParams={{
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
                }}
                onRedirectCallback={onRedirectCallback}
            >
                {children}
            </Auth0Provider>
        </>
    );
}

export default AuthProvider;