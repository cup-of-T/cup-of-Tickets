import { defaultAttributes } from "@dnd-kit/sortable/dist/hooks/defaults";
import { Team } from "../components/team/Team";
import { ITeam, IUser } from "../interfaces/interface";

interface ITeamsProps {
    teams: ITeam[],
    user: IUser
}

const Teams = ({ teams, user }: ITeamsProps) => {
    if (user == null) return;

    const team = teams.find(t => t.users.find(u => u.userId == user.userId));

    return (
        <Team team={team} />
    );
};

export default Teams;
