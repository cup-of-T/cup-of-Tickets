import React from 'react'
import { IUser } from '../../interfaces/interface'
import './UserCard.css'

type UserCardProps = {
    user: IUser
}


export const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className='user-card'>
            {user.name}
            {user.role}
        </div>
    )
}
