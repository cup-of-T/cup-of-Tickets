import React from 'react'
import { ITeam } from '../../interfaces/interface'
import { UserCard } from './UserCard'
import './Team.css'

type TeamProps = {
    team: ITeam
}

export const Team = ({ team }: TeamProps) => {
    return (
        <div className='team-card'>
            <h2 className='team-card__header'>{team.name}</h2>
            {team.users.map(user => <UserCard key={user.userId} user={user} />)}

        </div>
    )
}
