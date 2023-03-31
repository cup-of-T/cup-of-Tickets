import { defaultAttributes } from "@dnd-kit/sortable/dist/hooks/defaults";
import { divide } from "lodash";
import Loader from "../components/loader/Loader";
import { Team } from "../components/team/Team";
import { ITeam, IUser } from "../interfaces/interface";
import './pages.css'

interface ITeamsProps {
    teams: ITeam[],
    user: IUser
}

const TeamsPage = ({ teams, user }: ITeamsProps) => {

    const team = teams.find(t => t.users.find(u => u.userId == user.userId));
    console.log(teams, team)
    if (team == null) {
        return (<>please join a team</>);
    }
    return (
        <div className="team-page">
            <Team team={team} />
        </div>
    );
};

export default TeamsPage;
