import { IUser } from "../interfaces/interface";

export const FetchAllUsers = async () => {
    const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/Tickets")
    return await response.json() as IUser[];
}