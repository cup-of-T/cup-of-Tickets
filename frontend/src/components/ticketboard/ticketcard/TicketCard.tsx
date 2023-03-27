import React, { FC } from 'react'
import './ticketcard.css'

type TicketCardProps = {
  toggleAddBtn : () => void
}

export const TicketCard :FC<TicketCardProps> = ({ toggleAddBtn }) => {
  return (
    <ul className='ticket-board__grid fw-300 ticket-board__card-styling container'>
      <input onChange={() => toggleAddBtn()} className='ticket-board__checkbox' type="checkbox" />
      <li className='ticket-board__id'>#1</li>
      <li className='ticket-board__text'>Site is broken</li>
      <li className='ticket-board__requester'>Donna</li>
      <li className='ticket-board__requester-update'>Sunday 10am</li>
      <li className='ticket-board__group'>Frontend</li>
      <li className='ticket-board__assignee'>Lidia</li>
    </ul> 
  )
}
