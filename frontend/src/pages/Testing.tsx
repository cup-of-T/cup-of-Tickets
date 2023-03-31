import { User } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { UserContext } from '../context/UserProvider';
import { TicketsContextType, UserContextType } from '../types';

export const Testing = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])
    const { dbUser } = useContext(UserContext) as UserContextType

    const toggleAddBtn = (ticketId: number) => {
        if ( currentTicketIds.some(id => id == ticketId)) {
            console.log(currentTicketIds)
            setCurrentTicketIds([...currentTicketIds.filter(id => id !== ticketId)])
            return;
        }
        if (currentTicketIds.length == 0 ) {
            setAddToggleBtn(!addBtnToggle);
        }
        setCurrentTicketIds([...currentTicketIds, ticketId]);
    }

    const filteredTicketByStatus = tickets.filter(ticket => ticket.status == 2);
    // filter by team later


    return (
         <section className="ticket-board">
            <TicketsTable title={'Tickets to be reviewed/tested'}
                tickets={filteredTicketByStatus}
                toggleAddBtn={toggleAddBtn}
            />
        </section>
    );
};