import { withAuthenticationRequired } from "@auth0/auth0-react";
import  { ComponentType } from "react";

interface ProtectedRouteProps {
    component: ComponentType,
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <>
                Loading
            </>
        ),
    });

    return (<Component />);
};

export default ProtectedRoute;