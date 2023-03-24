import { IUser } from "../interfaces/interface";

export const getUsers = async () => {
    const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/Users")
    return await response.json() as IUser[];
}