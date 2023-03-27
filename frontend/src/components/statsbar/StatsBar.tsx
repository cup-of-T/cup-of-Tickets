
import React, { FC, useContext } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { useAuth0 } from '@auth0/auth0-react'
import { UsersContext } from '../../context/UsersProvider'
import { UsersContextType } from '../../types'

type StatsBarProps = {
  addBtnToggle : boolean,

}

export const StatsBar :FC<StatsBarProps> = ({ addBtnToggle }) => {
  const { user } = useAuth0();
  const { users, fetchUsers } = useContext(UsersContext) as UsersContextType;

  const currentUserRole = users.find(u => u.email == user?.email )?.role;


type StatsBarProps = {
  addBtnToggle : boolean
}

export const StatsBar :FC<StatsBarProps> = ({ addBtnToggle }) => {
  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          {currentUserRole == "admin" ? <button className='btn btn--blue'>Create ticket</button> : null}
          {addBtnToggle && ( <button className='btn btn--blue'>Add ticket +</button>)}
        </div>
      </div>
    </section>
  )
}
