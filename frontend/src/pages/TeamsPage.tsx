import { useContext } from "react";
import { Team } from "../components/team/Team";
import { ITeam, IUser } from "../interfaces/interface";
import './pages.css'
import { UserContext } from "../context/UserProvider";
import { UserContextType } from "../types";

interface ITeamsProps {
    team: ITeam
}

const TeamsPage = ({ team }: ITeamsProps) => {
    const { dbUser } = useContext(UserContext) as UserContextType;
    if (dbUser == null) return (<></>);
    if (team == undefined) {
        return (<div className="team-card__header">
            <h2>Please join a team</h2>
        </div>);
    }
    console.log(team);
    return (
        <div className="team-page">
            <Team team={team} />
        </div>
    );
};

export default TeamsPage;
