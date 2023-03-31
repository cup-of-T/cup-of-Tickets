import { User } from '@auth0/auth0-react';
import { indexOf } from 'lodash';
import React, { useContext, useEffect, useState } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { UserContext } from '../context/UserProvider';
import { ITicket } from '../interfaces/interface';
import { TicketsContextType, UserContextType } from '../types';

export const Testing = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const { tickets, patchTicketsStatus, setTickets} = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])
    const [filteredTicketsByStatus, setFilteredTicketsByStatus] = useState<ITicket[]>(tickets.filter(ticket => ticket.status == 2));
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

    const setReviewStatus = (ticketId : number) => {
        patchTicketsStatus(ticketId, 4);
        const newArray = [...tickets];
        const i =  newArray.findIndex(t => t.ticketId == ticketId);
        newArray[i].status = 4;
        setTickets(newArray);
    }

    // filter by team later


    return (
         <section className="ticket-board">
            <TicketsTable title={'Tickets to be reviewed'}
                tickets={filteredTicketsByStatus}
                toggleAddBtn={toggleAddBtn}
                setReviewStatus= {setReviewStatus}
            />
        </section>
    );
};