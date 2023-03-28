import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { postUser } from "../services/userApi";
import { UserContextType } from "../types";

interface IProfileProps {
}

const Profile = ({ }: IProfileProps) => {
    return (
        <>
            profile
        </>
    );
};

export default Profile;
