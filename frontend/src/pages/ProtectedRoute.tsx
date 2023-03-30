import { withAuthenticationRequired } from "@auth0/auth0-react";
import  { ComponentType } from "react";
import Loader from "../components/loader/Loader";

interface ProtectedRouteProps {
    component: ComponentType,
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <>
                <Loader/>
            </>
        ),
    });

    return (<Component />);
};

export default ProtectedRoute;