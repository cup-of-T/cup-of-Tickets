import { FC, useContext } from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'
import { TicketsContext } from '../../context/TicketsProvider'
import { TicketsContextType } from '../../types'
import { ITicket } from '../../interfaces/interface'

type TicketBoardProps = {
  toggleAddBtn: (ticketId: number) => void
}

export const TicketBoard: FC<TicketBoardProps> = ({ toggleAddBtn }) => {
  const { tickets } = useContext(TicketsContext) as TicketsContextType;
  
  const completedTickets = tickets.filter(t => t.status == 2);
  const availableTickets = tickets.filter(t=>t.status != 2);
  const unassignedTickets = availableTickets.filter(ticket => ticket.assignedUser == null).sort((a, b) => b.urgency - a.urgency);
  const assignedTickets = availableTickets.filter(ticket => ticket.assignedUser !== null).sort((a, b) => b.urgency - a.urgency);

  return (
    <section className="ticket-board">
      <h3>Available tickets</h3>
      <TicketHeader />
      {/* <div className="ticket-board--category"> */}
      {unassignedTickets.map(ticket => {
        return (
          <div className="ticket-card">
            <TicketCard
              toggleAddBtn={toggleAddBtn}
              ticket={ticket}
              key={ticket.ticketId}
            />
          </div>
        )
      })}
      {/* </div> */}
      <h3>Assigned tickets</h3>
      <TicketHeader />
      {assignedTickets.map(ticket => {
        return (
          <div className="ticket-card">
            <TicketCard
              toggleAddBtn={toggleAddBtn}
              ticket={ticket}
              key={ticket.ticketId}
            />
          </div>
        )
      })}
      <h3>Closed tickets</h3>
      <TicketHeader />
      {completedTickets.map(ticket => {
        return (
          <div className="ticket-card">
            <TicketCard
              toggleAddBtn={toggleAddBtn}
              ticket={ticket}
              key={ticket.ticketId}
            />
          </div>
        )
      })}
    </section>
  )
}
