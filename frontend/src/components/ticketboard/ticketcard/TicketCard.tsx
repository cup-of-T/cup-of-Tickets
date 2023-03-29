import { FC, useState } from 'react'
import { ITicket } from '../../../interfaces/interface'
import './ticketcard.css'

type TicketCardProps = {
  toggleAddBtn: (ticketId: number) => void,
  ticket: ITicket
}

export const TicketCard: FC<TicketCardProps> = ({ toggleAddBtn, ticket }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleUrgencySign = () => {
    switch (ticket.urgency) {
      case 1: {
        return "color-yellow fa-solid fa-circle";
      }
      case 2: {
        return "color-red  fa-solid fa-circle";
      }
      default: {
        return "";
      }
    }
  }

  const handleStatus = () => {
    switch (ticket.status) {
      case 1: {
        return <span className='status-icon bg--grey'>CLOSED</span>;
      }
      default: {
        return <span className='status-icon bg--red'>OPEN</span>;
      }
    }
  }

  const handleBgColor = [
    '',
    'ticket-board--medium',
    'ticket-board--urgent'
  ]



  return (
    <>
      <ul onMouseEnter={() => setShowPopUp(!showPopUp)}
        onMouseLeave={() => setShowPopUp(!showPopUp)}
        className={handleBgColor[ticket.urgency] + ' ticket-board__grid fw-300 ticket-board__card-styling'}>
        {ticket.assignedUser == null && (
          <input
            onChange={() => toggleAddBtn(ticket.ticketId)}
            className='ticket-board__checkbox' type="checkbox" />)}
        <li className='ticket-board__urgency'><i className={handleUrgencySign()}></i></li>
        <li className='ticket-board__text'>{ticket.title}</li>
        <li className='ticket-board__requester'>{ticket.creator.name ? ticket.creator.name : ticket.creator.email}</li>
        <li className='ticket-board__requester-update'>{ticket.createdAt}</li>
        <li className='ticket-board__group'>{ticket.timeEstimate}</li>
        <li className='ticket-board__assignee'>{ticket.assignedUser ? ticket.assignedUser.name : "-"}</li>
      </ul>
      {showPopUp && (
        <div className='popup-card'>
          <div className="popup-card__header">
            <p>{handleStatus()} Issue # {ticket.ticketId} </p>
            <p className='popup-card__title '>{ticket.title}</p>
          </div>
          <p className='popup-card__description'>{ticket.description}</p>

        </div>)}
    </>
  )
}
