import React from 'react'
import { ITeam } from '../../interfaces/interface'
import { UserCard } from './UserCard'
import './Team.css'
import { orderBy, sortBy } from 'lodash'

type TeamProps = {
    team: ITeam
}

export const Team = ({ team }: TeamProps) => {

    // team.users.sort((a, b) => a.role.localeCompare(b.role));
    const adminsAndManagers = team.users.filter(u => u.role == ('Admin' || 'Manager'));
    const users = team.users.filter(u => u.role == 'User');

    return (
        <div className='team-card'>
            <div className="team-card__header">
                <h2>{team.name}</h2>
                <h4>Meet the crew</h4>
            </div>
            <div className='team-card__users'>
                {adminsAndManagers.map(user => <UserCard key={user.userId} user={user} />)}
            </div>
            <div className='team-card__users'>
                {users.map(user => <UserCard key={user.userId} user={user} />)}
            </div>
        </div>
    )
}
