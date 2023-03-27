import React, { FC } from 'react'
import { ITicket } from '../../../interfaces/interface'
import './ticketcard.css'

type TicketCardProps = {
  toggleAddBtn : () => void,
  ticket: ITicket
}

export const TicketCard :FC<TicketCardProps> = ({ toggleAddBtn, ticket }) => {


  const handleUrgencySign = () => {
    switch(ticket.urgency) { 
      case 0: { 
          return " fa-solid fa-triangle-exclamation"
      } 
      case 1: { 
        return "color-yellow fa-solid fa-triangle-exclamation"
      } 
      case 2: { 
        return "color-red fa-solid fa-triangle-exclamation"
      } 
   } 
  }

  return (
    <ul className='ticket-board__grid fw-300 ticket-board__card-styling container'>
      <input onChange={() => toggleAddBtn()} className='ticket-board__checkbox' type="checkbox" />
      <li className='ticket-board__urgency'><i className={handleUrgencySign()}></i></li>
      <li className='ticket-board__text'>{ticket.title}</li>
      <li className='ticket-board__requester'>{ticket.creator.name ? ticket.creator.name : ticket.creator.email}</li>
      <li className='ticket-board__requester-update'>{ticket.createdAt}</li>
      <li className='ticket-board__group'>{ticket.status}</li>
      <li className='ticket-board__assignee'>{ticket.assignedUser ? ticket.assignedUser.name : "-"}</li>
    </ul> 
  )
}
