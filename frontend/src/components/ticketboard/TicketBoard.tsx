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

  const sortedByUrgency = (tickets : ITicket[]) => tickets.sort((a, b) => b.urgency - a.urgency);

  const sortedTicketsByAssignee = () => {
    var unassignedTickets = tickets.filter(ticket => ticket.assignedUser == null);
    var assignedTickets = tickets.filter(ticket => ticket.assignedUser !== null);

    return new Array().concat(sortedByUrgency(unassignedTickets), sortedByUrgency(assignedTickets));
  }

  return (
    <section className="ticket-board">
        <TicketHeader />
        {sortedTicketsByAssignee().map( ticket => <TicketCard toggleAddBtn = {toggleAddBtn} ticket={ticket} key={ticket.ticketId}/>)}
    </section>
  )
}
 