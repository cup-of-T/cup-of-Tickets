import React from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../../interfaces/interface'
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
                <p className="user-card__info__role">{Roles[user.role]}</p>
                <div className='user-card__icons'>
                    <Link to={"mailto:" + user.email} title={"Email - " + user.name}>
                        <i className="fa-solid fa-envelope"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}