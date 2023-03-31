import { ITeam } from "../interfaces/interface";

export const getTeams = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Teams`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as ITeam[];
}