import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { postUser } from "../services/userApi";
import { UserContextType } from "../types";

interface IProfileProps {
}

const Profile = ({ }: IProfileProps) => {

    const { getAccessTokenSilently } = useAuth0();
    const { setDbUser } = useContext(UserContext) as UserContextType;

    useEffect(() => {
        const getOrPostUser = async () => {
            const accessToken = await getAccessTokenSilently();
            setDbUser(await postUser(accessToken));
        }
        getOrPostUser();
        console.log('donna help');

    }, []);

    return (
        <>
            profile
        </>
    );
};

export default Profile;
