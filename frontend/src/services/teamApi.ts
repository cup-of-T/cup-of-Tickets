import { ITeam } from "../interfaces/interface";

<<<<<<< HEAD
export const getTeams = async (accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Teams`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as ITeam[];
=======
export const getTeam = async (teamId: number, accessToken: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Teams/${teamId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return await response.json() as ITeam;
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
}