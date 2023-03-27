import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/interface";
import { getUsers, postUser } from "../services/userApi";

interface UserProviderProps {
    children: React.ReactNode
}

export const UsersContext = createContext({});

const UserProvider = ({ children }: UserProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const [dbUser, setDbUser] = useState<IUser>();

    return (
        <UsersContext.Provider value={{ dbUser, setDbUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export default UserProvider;
