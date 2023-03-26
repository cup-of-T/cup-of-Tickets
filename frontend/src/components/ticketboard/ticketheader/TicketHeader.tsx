import React from 'react'
import './ticketheader.css'

export const TicketHeader = () => {
  return (
    <ul className='ticket-board__header ticket-board__card-styling ticket-board__grid container'>
      <input className='ticket-board__checkbox' type="checkbox" />
      <li className='ticket-board__id'>ID</li>
      <li className='ticket-board__text'>Subject</li>
      <li className='ticket-board__requester'>Requester</li>
      <li className='ticket-board__requester-update'>Requester updated</li>
      <li className='ticket-board__group'>Group</li>
      <li className='ticket-board__assignee'>Assignee</li>
    </ul> 
  )
}
