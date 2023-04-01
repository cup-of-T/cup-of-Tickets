import { Team } from "../components/team/Team";
import { ITeam, IUser } from "../interfaces/interface";
import './pages.css'

interface ITeamsProps {
    teams: ITeam[],
    user: IUser
}

const TeamsPage = ({ teams, user }: ITeamsProps) => {
    const team = teams.find(t => t.users.find(u => u.userId == user.userId));

    if (team == null) {
        return (<div className="team-card__header">
            <h2>Please join a team</h2>
        </div>);
    }

    return (
        <div className="team-page">
            <Team team={team} />
        </div>
    );
};

export default TeamsPage;
