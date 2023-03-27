
import React, { FC, useContext } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { useAuth0 } from '@auth0/auth0-react'
import { UsersContext } from '../../context/UsersProvider'
import { TicketsContextType, UsersContextType } from '../../types'
import { TicketsContext } from '../../context/TicketsProvider'
import { updateTicketAssignedTo } from '../../services/ticketApi'
import { ITicket } from '../../interfaces/interface'

type StatsBarProps = {
  addBtnToggle : boolean,
  ticketId: number
}

export const StatsBar :FC<StatsBarProps> = ({ addBtnToggle, ticketId }) => {
  const { user } = useAuth0();
  const { users } = useContext(UsersContext) as UsersContextType;
  const { updateTicketAssignee } = useContext(TicketsContext) as TicketsContextType;

  const currentUser = users.find(u => u.email == user?.email );

  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          {currentUser?.role == "admin" ? <button className='btn btn--blue'>Create ticket</button> : null}
          {addBtnToggle && ( 
          <button 
            onClick={() => updateTicketAssignee(ticketId, currentUser!.userId)}
            className='btn btn--blue'>Add ticket +
          </button>)}
        </div>
      </div>
    </section>
  )
}

