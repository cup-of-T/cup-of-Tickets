import React, { FC, useContext } from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'
import TicketProvider, { TicketsContext } from '../../context/TicketsProvider'
import { TicketsContextType } from '../../types'
import { ITicket } from '../../interfaces/interface'

type TicketBoardProps = {
  toggleAddBtn : (ticketId : number) => void
}

export const TicketBoard :FC<TicketBoardProps> = ({ toggleAddBtn }) => {
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;

  return (
    <section className="ticket-board">
        <TicketHeader />
        {tickets.sort((a, b) => (a.assignedUser !== null ? a.assignedUser.userId : -Infinity) - (b.assignedUser !== null ? b.assignedUser.userId : -Infinity)).map( ticket => <TicketCard toggleAddBtn = {toggleAddBtn} ticket={ticket} key={ticket.ticketId}/> )}
    </section>
  )
}
