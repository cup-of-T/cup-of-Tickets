import { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/interface";

interface UserProviderProps {
    children: React.ReactNode
}

export const UsersContext = createContext({});

const UserProvider = ({ children }: UserProviderProps) => {
    const [dbUser, setDbUser] = useState<IUser>();

    return (
        <UsersContext.Provider value={{ dbUser, setDbUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export default UserProvider;
