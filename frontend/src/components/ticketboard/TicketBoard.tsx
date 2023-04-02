import './ticketboard.css'
import { ITicket } from '../../interfaces/interface'
import { TicketsTable } from './ticketstable/TicketsTable'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import { UserContextType } from '../../types'
import Loader from '../loader/Loader'

type TicketBoardProps = {
  toggleAddBtn: (ticketId: number) => void,
  setReviewStatus?: (ticketId: number) => void,
  tickets: ITicket[],
  showAlert?: boolean,
  teamName: string
}

export const TicketBoard = ({ toggleAddBtn, tickets, showAlert, setReviewStatus, teamName }: TicketBoardProps) => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  if (dbUser == null) return (<Loader />);

  const availableTickets = tickets.filter(t => t.status != 2);
  const unassignedTickets = availableTickets.filter(ticket => ticket.assignedUser == null).sort((a, b) => b.urgency - a.urgency);
  const assignedTickets = availableTickets.filter(ticket => ticket.assignedUser !== null && ticket.archived !== true).sort((a, b) => b.urgency - a.urgency);

  return (
    <section className="ticket-board">
      <TicketsTable title={tickets.filter(t => t.assignedUser == null).length != 0 ? 'Available tickets' : 'No tickets available'}
        showAlert={showAlert}
        tickets={unassignedTickets}
        toggleAddBtn={toggleAddBtn}
      />
      {(dbUser.role == 'Manager' || dbUser.role == 'Admin') &&
        <TicketsTable title={`Claimed tickets by ${teamName}`}
          tickets={assignedTickets}
          setReviewStatus={setReviewStatus}
          toggleAddBtn={toggleAddBtn}
        />

      }
    </section>
  )
}
