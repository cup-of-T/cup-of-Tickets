import React, { FC, useContext } from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'
import TicketProvider, { TicketsContext } from '../../context/TicketsProvider'
import { TicketsContextType } from '../../types'
import { ITicket } from '../../interfaces/interface'

type TicketBoardProps = {
  toggleAddBtn : (ticket : ITicket) => void
}

export const TicketBoard :FC<TicketBoardProps> = ({ toggleAddBtn }) => {
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;

  return (
    <section className="ticket-board">
        <TicketHeader />
        {tickets.map( ticket => <TicketCard toggleAddBtn = {toggleAddBtn} ticket={ticket} key={ticket.ticketId}/> )}
    </section>
  )
}
