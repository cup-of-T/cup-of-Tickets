import React from 'react'
import { ITicket } from '../../../interfaces/interface'
import { TicketAlert } from '../ticketalert/TicketAlert'
import { TicketCard } from '../ticketcard/TicketCard'
import { TicketHeader } from '../ticketheader/TicketHeader'

type TicketsTableProps = {
    title: string,
    tickets: ITicket[],
    toggleAddBtn: (ticketId: number) => void,
    setReviewStatus?: (ticketId: number, status : number) => void,
    showAlert?: boolean
}

export const TicketsTable = ({ title, tickets, toggleAddBtn, showAlert, setReviewStatus }: TicketsTableProps) => {

    return (
        <>
            <h3 className='page__title'>{title}</h3>
            {showAlert && <TicketAlert />}
            <TicketHeader />
            {tickets.map(ticket => {
                return (
                    <div className="ticket-card container center" key={ticket.ticketId}>
                        <TicketCard
                            toggleAddBtn={toggleAddBtn}
                            ticket={ticket}
                            setReviewStatus={setReviewStatus}
                        />
                    </div>
                )
            })}
        </>
    )
}
