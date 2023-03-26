import { IUser } from "../interfaces/interface";


export const getUsers = async (accesToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        headers: { Authorization: `Bearer ${accesToken}` }
    })
    return await response.json() as IUser[];
}

export const postUser = async (user: IUser, accesToken: string) => {
    const userToJson = JSON.stringify(user);
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        method: 'POST',
        body: userToJson,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesToken}`
        },
    })
    return await response.json() as IUser;
}