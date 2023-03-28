import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/interface";
import { getUsers, postUser} from "../services/userApi";

interface UserProviderProps {
    children: React.ReactNode
}

export const UsersContext = createContext({});

const UserProvider = ({ children }: UserProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const [users, setUsers] = useState<IUser[]>([]);

    const fetchUsers = async () => {
        const accessToken = await getAccessTokenSilently();
        setUsers(await getUsers(accessToken));
    }

    const postingUser = async (ticket: IUser) => {
        const accessToken = await getAccessTokenSilently();
        const response = await postUser(ticket, accessToken);
        setUsers(prevState => [ticket, ...prevState]);
    }

    return (
        <UsersContext.Provider value={{ users, setUsers, fetchUsers, postingUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export default UserProvider;
