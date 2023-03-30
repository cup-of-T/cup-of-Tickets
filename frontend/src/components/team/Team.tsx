import React from 'react'
import { ITeam } from '../../interfaces/interface'

type TeamProps = {
    team: ITeam
}

export const Team = ({ team }: TeamProps) => {
    return (
        <>
            {team.users.map(u => u.name)}
            {team.users.map(u => <img src={import.meta.env.VITE_API_SERVER_URL + '/Images/' + u.imageUrl} />)}
        </>
    )
}
