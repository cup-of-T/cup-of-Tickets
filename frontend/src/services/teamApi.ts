import { ITeam } from "../interfaces/interface";

export const getTeam = async (teamId: number, accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Teams/${teamId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as ITeam;
}