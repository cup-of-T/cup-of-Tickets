import { Auth0Provider, AppState, useAuth0 } from "@auth0/auth0-react";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
// import { DefaultAzureCredential, SecretClient } from "@azure/keyvault-secrets";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: React.ReactNode
}

const credential = new DefaultAzureCredential();
const vaultName = "ticketVault";

const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);
const auth0Domain = await client.getSecret("vite-auth0-domain");
const domain = auth0Domain.value!;

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && import.meta.env.VITE_AUTH0_CLIENT_ID && import.meta.env.VITE_AUTH0_CALLBACK_URL && import.meta.env.VITE_AUTH0_AUDIENCE)) {
        return null;
    }

    return (
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
    );
}

export default AuthProvider;