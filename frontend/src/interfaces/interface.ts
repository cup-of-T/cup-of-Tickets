export interface IUser {
    userId: number,
    email: string,
    name: string,
    role: string,
    imageUrl: string,
    teams: ITeam[]
}

interface ITeam {
    teamId: number,
    name: string,
    users: IUser[]
}