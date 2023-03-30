import React from 'react'
import { ITicket } from '../../../interfaces/interface'
import { TicketCard } from '../ticketcard/TicketCard'
import { TicketHeader } from '../ticketheader/TicketHeader'

type TicketsTableProps = {
    title: string,
    tickets: ITicket[],
    toggleAddBtn: (ticketId: number) => void
}
export const TicketsTable = ({ title, tickets, toggleAddBtn }: TicketsTableProps) => {
    return (
        <>
            <h3>{title}</h3>
            <TicketHeader />
            {tickets.map(ticket => {
                return (
                    <div className="ticket-card" key={ticket.ticketId}>
                        <TicketCard
                            toggleAddBtn={toggleAddBtn}
                            ticket={ticket}
                        />
                    </div>
                )
            })}
        </>
    )
}
