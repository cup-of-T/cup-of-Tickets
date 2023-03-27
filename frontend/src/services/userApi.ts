import { IUser } from "../interfaces/interface";


export const getUsers = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as IUser[];
}

export const getUserByEmail = async (email: string | undefined, accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users/email/${email}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    if (response.status != 200) {
        return null;
    }
    return await response.json() as IUser;
}

export const postUser = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    return await response.json() as IUser;
}