import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/interface";
import { getUsers, postUser} from "../services/userApi";

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext({});

const UserProvider = ({ children }: UserProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const [user, setUser] = useState<IUser[]>([]);

    const fetchUser = async () => {
        const accessToken = await getAccessTokenSilently();
        setUser(await getUsers(accessToken));
    }

    const postingUser = async (ticket: IUser) => {
        const accessToken = await getAccessTokenSilently();
        const response = await postUser(ticket, accessToken);
        setUser(prevState => [ticket, ...prevState]);
    }

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, postingUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
