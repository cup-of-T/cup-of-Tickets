import { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/interface";

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext({});

const UserProvider = ({ children }: UserProviderProps) => {
    const [dbUser, setDbUser] = useState<IUser>();

    return (
        <UserContext.Provider value={{ dbUser, setDbUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
