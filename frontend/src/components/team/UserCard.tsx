import React from 'react'
import { IUser } from '../../interfaces/interface'
import { MailIcon } from './MailIcon'
import './UserCard.css'

type UserCardProps = {
    user: IUser
}

type RoleType = {
    [propKey: string]: string,
}


export const UserCard = ({ user }: UserCardProps) => {
    const Roles: RoleType = {
        'Admin': 'Admin/Manager',
        'Manager': 'Manager',
        'User': 'Developer'
    }

    return (
        <div className='user-card'>
            <img className='user-card__image'
                src={user.imageUrl}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/default_pfp.png";
                }}
            />
            <div className="user-card__info">
                <p className='user-card__info__name'>{user.name}</p>
                <p>{Roles[user.role]}</p>
                <MailIcon name={user.name} mail={user.email} />
            </div>
        </div>
    )
}
