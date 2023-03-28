import React from 'react'
import './ticketheader.css'

export const TicketHeader = () => {
  return (
    <ul className='ticket-board__header ticket-board__card-styling ticket-board__grid container'>
      {/* <input className='ticket-board__checkbox' type="checkbox" /> */}
      <li className='ticket-board__urgency'><i className="fa-solid fa-circle-exclamation"></i></li>
      <li className='ticket-board__text'>Title</li>
      <li className='ticket-board__requester'>Requester</li>
      <li className='ticket-board__requester-update'>Created at</li>
      <li className='ticket-board__group'>Complexity</li>
      <li className='ticket-board__assignee'>Assignee</li>
    </ul> 
  )
}
