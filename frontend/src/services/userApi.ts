import { IUser } from "../interfaces/interface";


export const getUsers = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as IUser[];
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

export const putUser = async (accessToken: string, userId: number, userRequest: FormData) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users/${userId}`, {
        method: 'PUT',
        body: userRequest,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    return await response.json() as IUser;
}