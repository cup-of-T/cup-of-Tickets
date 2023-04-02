import { User } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { UserContext } from '../context/UserProvider';
import { TicketsContextType, UserContextType } from '../types';

export const InProgress = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])
    const { dbUser } = useContext(UserContext) as UserContextType

    const toggleAddBtn = (ticketId: number) => {
        if ( currentTicketIds.some(id => id == ticketId)) {
            setCurrentTicketIds([...currentTicketIds.filter(id => id !== ticketId)])
            return;
        }
        if (currentTicketIds.length == 0 ) {
            setAddToggleBtn(!addBtnToggle);
        }
        setCurrentTicketIds([...currentTicketIds, ticketId]);
    }

    const filteredTicketByStatus = tickets.filter(ticket => ticket.status == 1);
    // filter by team later


    return (
         <section className="ticket-board">
            <TicketsTable title={'In Progress tickets'}
                tickets={filteredTicketByStatus}
                toggleAddBtn={toggleAddBtn}
            />
        </section>
    );
};


