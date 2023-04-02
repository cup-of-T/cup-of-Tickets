import { FC, useState } from 'react'
import { ITicket } from '../../../interfaces/interface'
import './ticketcard.css'

type TicketCardProps = {
  toggleAddBtn: (ticketId: number) => void,
  setReviewStatus?: (ticketId: number, status : number) => void,
  ticket: ITicket
}

export const TicketCard: FC<TicketCardProps> = ({ toggleAddBtn, ticket, setReviewStatus }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isPopUpHovered, setIsPopupHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleUrgencySign = () => {

    // fix this after table drop
    if (ticket.archived == true && ticket.status == 4)
    {
      return <li className='center tag-icon bg--black ticket-board__urgency'>ARCHIVED</li>
    }
      switch (ticket.urgency) {
        case 1: {
          return <li className='center tag-icon bg--orange ticket-board__urgency'>MEDIUM</li>
        }
        case 2: {
          return <li className='center tag-icon bg--red ticket-board__urgency'>URGENT</li>
        }        
        default: {
          return <li className='center tag-icon bg--green ticket-board__urgency'>NORMAL</li>
        }
      }
  }

  const handleStatus = () => {
    switch (ticket.status) {
      case 2:
        return <span className='tag-icon bg--black'>CLOSED</span>;
      default:
        return <span className='tag-icon bg--grey'>OPEN</span>;
    }
  }

  return (
    <>
      <ul onMouseEnter={() => setShowPopUp(true)}
        onMouseLeave={() => setShowPopUp(false)}
        onClick={() => {
          toggleAddBtn(ticket.ticketId)
          setIsChecked(!isChecked)
        }}
        className='ticket-board__grid fw-300 ticket-board__card-styling container'>
        {(ticket.assignedUser == null)&& (
          <input
            onChange={() => toggleAddBtn(ticket.ticketId)}
            className='ticket-board__checkbox' type="checkbox" checked={isChecked} />)}
        {handleUrgencySign()}
        <li className='ticket-board__text'>{ticket.title}</li>
        <li className='ticket-board__requester'>{ticket.creator.name ? ticket.creator.name : ticket.creator.email}</li>
        <li className='ticket-board__requester-update'>{ticket.createdAt}</li>
        <li className='ticket-board__group'>{ticket.timeEstimate}</li>
        <li className='ticket-board__assignee'>{ticket.assignedUser ? ticket.assignedUser.name : "-"}</li>
      </ul>

      {(showPopUp || isPopUpHovered) && (
        <div className='popup-card' 
          onMouseEnter={() => setIsPopupHovered(true)}
          onMouseLeave={() => setIsPopupHovered(false)}>
          <div className="popup-card__header">
            <div className="popup-card__tags">
                {handleStatus()}
              <ul className='popup-card__categories'>
                {
                ticket.categories.map( category => <li className="tag-icon bg--caribbean">{category.name.toUpperCase()}</li>)
                }
              </ul>
            </div>
              <p> Issue # {ticket.ticketId} </p>
            <p className='popup-card__title '>{ticket.title}</p>
          </div>
          <p className='popup-card__description'>{ticket.description}</p>
          {(ticket.status == 2)&& (
          <div className='ticket-review__btns'>
            <button
              className='btn btn--green ticket-review__btn--large'
              onClick={() => setReviewStatus!(ticket.ticketId, 4)}
              >Approve <i className="fa-solid fa-circle-check ticket-review__btn--icon"></i></button>
            <button
              className='btn btn--red ticket-review__btn--large'
              onClick={() => setReviewStatus!(ticket.ticketId, 3)}
              > Request changes <i className="fa-solid fa-circle-xmark ticket-review__btn--icon"></i></button>
            </div>)}
        </div>)}
    </>
  )
}
