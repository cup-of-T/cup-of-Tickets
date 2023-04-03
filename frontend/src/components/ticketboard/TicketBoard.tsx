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
<<<<<<< HEAD
}

export const TicketBoard = ({ toggleAddBtn, tickets, showAlert, setReviewStatus }: TicketBoardProps) => {
=======
  teamName: string
}

export const TicketBoard = ({ toggleAddBtn, tickets, showAlert, setReviewStatus, teamName }: TicketBoardProps) => {
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
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
<<<<<<< HEAD
        <TicketsTable title={`Claimed tickets by ${'${team}'}`}
=======
        <TicketsTable title={`Claimed tickets by ${teamName}`}
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
          tickets={assignedTickets}
          setReviewStatus={setReviewStatus}
          toggleAddBtn={toggleAddBtn}
        />

      }
<<<<<<< HEAD
      {/* <TicketsTable title={'Closed tickets'}
        tickets={completedTickets}
        toggleAddBtn={toggleAddBtn}
      /> */}
=======
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
    </section>
  )
}
