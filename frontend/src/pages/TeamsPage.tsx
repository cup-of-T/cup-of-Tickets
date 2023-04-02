import { Team } from "../components/team/Team";
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

export default TeamsPage;
