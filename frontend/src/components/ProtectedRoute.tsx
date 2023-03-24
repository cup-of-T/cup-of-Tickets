import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import { Route, RouteProps } from "react-router-dom";

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