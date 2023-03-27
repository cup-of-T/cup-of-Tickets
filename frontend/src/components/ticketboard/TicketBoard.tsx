import React, { FC, useContext } from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'

type TicketBoardProps = {
  toggleAddBtn : () => void
}

export const TicketBoard :FC<TicketBoardProps> = ({ toggleAddBtn }) => {
  // const Tickets = useContext()

  return (
    <section className="ticket-board">
        <TicketHeader />
        <TicketCard toggleAddBtn = {toggleAddBtn}/>
    </section>
  )
}
