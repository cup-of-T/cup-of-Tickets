import React from 'react'
import { TicketCard } from './ticketcard/TicketCard'
import { TicketHeader } from './ticketheader/TicketHeader'
import './ticketboard.css'

export const TicketBoard = () => {
  return (
    <section className="ticket-board">
        <TicketHeader />
        <TicketCard/>
    </section>
  )
}
