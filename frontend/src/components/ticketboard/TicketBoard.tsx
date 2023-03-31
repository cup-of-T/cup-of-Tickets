import './ticketboard.css'
import { ITicket } from '../../interfaces/interface'
import { TicketsTable } from './ticketstable/TicketsTable'

type TicketBoardProps = {
  toggleAddBtn: (ticketId: number) => void,
  tickets: ITicket[],
  showAlert?: boolean,
}

export const TicketBoard = ({ toggleAddBtn, tickets, showAlert }: TicketBoardProps) => {

  const availableTickets = tickets.filter(t => t.status != 2);
  const unassignedTickets = availableTickets.filter(ticket => ticket.assignedUser == null).sort((a, b) => b.urgency - a.urgency);
  const assignedTickets = availableTickets.filter(ticket => ticket.assignedUser !== null  && ticket.archived !== true).sort((a, b) => b.urgency - a.urgency);

  return (
    <section className="ticket-board">
      <TicketsTable title={'Available tickets'}
        showAlert={showAlert}
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
