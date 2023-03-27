import { IUser } from "../interfaces/interface";


export const getUsers = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as IUser[];
}

export const getUserByEmail = async (email: string, accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users/email`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(email)
    })
    if (response.status != 200) {
        return null;
    }
    return await response.json() as IUser;
}

export const postUser = async (user: IUser, accessToken: string) => {
    const userToJson = JSON.stringify(user);
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        method: 'POST',
        body: userToJson,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
    })
    return await response.json() as IUser;
}