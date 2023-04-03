import { Team } from "../components/team/Team";
<<<<<<< HEAD
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
=======
import { ITeam } from "../interfaces/interface";
import './pages.css'

interface ITeamsProps {
    team: ITeam
}

const TeamsPage = ({ team }: ITeamsProps) => (
    <div className="team-page">
        <Team team={team} />
    </div>
)
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7

export default TeamsPage;
