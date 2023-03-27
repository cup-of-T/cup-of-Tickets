
export interface IUser {
    userId: number,
    email: string,
    name: string,
    role: string,
    imageUrl: string,
    teams: ITeam[]
}


  ticketId: number
  title: string,
  createdAt: string,
  description: string,
  archived: boolean,
  urgency: number,
  status: number,
  timeEstimate: string,
  creator : IUser,
  assignedUser: IUser,
  categories: ICategory,
}

export interface ICategory {
  categoryId: number,
  name: string,
}

interface ITeam {
    teamId: number,
    name: string,
    users: IUser[]
}
