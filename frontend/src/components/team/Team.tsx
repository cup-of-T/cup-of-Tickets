import React from 'react'
import { ITeam } from '../../interfaces/interface'
import { UserCard } from './UserCard'
import './Team.css'
import { orderBy, sortBy } from 'lodash'

type TeamProps = {
    team: ITeam
}

export const Team = ({ team }: TeamProps) => {

<<<<<<< HEAD
    // team.users.sort((a, b) => a.role.localeCompare(b.role));
    const adminsAndManagers = team.users.filter(u => (u.role == 'Admin' || u.role == 'Manager'));
    const users = team.users.filter(u => u.role == 'User');
=======
    const managers = team?.users?.filter(u => u.role == 'Manager');
    const users = team?.users?.filter(u => u.role == 'User');
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7

    return (
        <div className='team-card'>
            <div className="team-card__header">
                <h2>{team.name}</h2>
                <h4>Meet the crew</h4>
            </div>
            <div className='team-card__users'>
<<<<<<< HEAD
                {adminsAndManagers.map(user => <UserCard key={user.userId} user={user} />)}
            </div>
            <div className='team-card__users'>
                {users.map(user => <UserCard key={user.userId} user={user} />)}
=======
                {managers?.map(user => <UserCard key={user.userId} user={user} />)}
            </div>
            <div className='team-card__users'>
                {users?.map(user => <UserCard key={user.userId} user={user} />)}
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
            </div>
        </div>
    )
}
