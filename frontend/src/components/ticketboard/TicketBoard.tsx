import { FC, useContext } from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'
import { TicketsContext } from '../../context/TicketsProvider'
import { TicketsContextType } from '../../types'
import { ITicket } from '../../interfaces/interface'
import { AddTicketForm } from '../addticketform/AddTicketForm'
import { TicketsTable } from './ticketstable/TicketsTable'

type TicketBoardProps = {
  toggleAddBtn : (ticketId : number) => void
}

export const TicketBoard = ({ toggleAddBtn }: TicketBoardProps) => {

  const { tickets } = useContext(TicketsContext) as TicketsContextType;

  const completedTickets = tickets.filter(t => t.status == 2);
  const availableTickets = tickets.filter(t => t.status != 2);
  const unassignedTickets = availableTickets.filter(ticket => ticket.assignedUser == null).sort((a, b) => b.urgency - a.urgency);
  const assignedTickets = availableTickets.filter(ticket => ticket.assignedUser !== null).sort((a, b) => b.urgency - a.urgency);

  return (
    <section className="ticket-board">
      <TicketsTable title={'Available tickets'}
        tickets={unassignedTickets}
        toggleAddBtn={toggleAddBtn}
      />
      <TicketsTable title={'Assigned tickets'}
        tickets={assignedTickets}
        toggleAddBtn={toggleAddBtn}
      />
      {/* <TicketsTable title={'Closed tickets'}
        tickets={completedTickets}
        toggleAddBtn={toggleAddBtn}
      /> */}
    </section>
  )
}
