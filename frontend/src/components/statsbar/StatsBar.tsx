import React, { FC, useContext, useEffect } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { UserContext } from '../../context/UserProvider'
import { TicketsContextType, UserContextType } from '../../types'
import { TicketsContext } from '../../context/TicketsProvider'

type StatsBarProps = {
  addBtnToggle: boolean,
  ticketId: number
}

export const StatsBar: FC<StatsBarProps> = ({ addBtnToggle, ticketId }) => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { updateTicketAssignee } = useContext(TicketsContext) as TicketsContextType;
  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          {addBtnToggle && (
            <button
              onClick={() => updateTicketAssignee(ticketId, dbUser.userId)}
              className='btn btn--blue'>Claim ticket
            </button>)}
          {dbUser?.role == "Admin" || dbUser?.role == "Manager" &&
            <button className='btn btn--green'>Create ticket</button>
          }
        </div>
      </div>
    </section>
  )
}