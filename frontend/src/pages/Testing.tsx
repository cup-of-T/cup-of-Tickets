import { useAuth0, User } from '@auth0/auth0-react';
import { indexOf } from 'lodash';
import React, { useContext, useEffect, useState } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { UserContext } from '../context/UserProvider';
import { ITicket } from '../interfaces/interface';
import { updateTicketStatus } from '../services/ticketApi';
import { TicketsContextType, UserContextType } from '../types';

export const Testing = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
<<<<<<< HEAD
    const { tickets, patchTicketsStatus, setTickets} = useContext(TicketsContext) as TicketsContextType;
=======
    const { tickets, setTickets} = useContext(TicketsContext) as TicketsContextType;
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])
    const { getAccessTokenSilently } = useAuth0();
    const [filteredTicketsByStatus, setFilteredTicketsByStatus] = useState<ITicket[]>();
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

    const setReviewStatus = async (ticketId : number, status : number) => {
        
        updateTicketStatus(ticketId, status, await getAccessTokenSilently());
        const newArray = [...tickets];
        const i =  newArray.findIndex(t => t.ticketId == ticketId);
        newArray[i].status = status;
        //setTickets(newArray);
        setFilteredTicketsByStatus(newArray);
    }

    // filter by team later


    return (
         <section className="ticket-board">
            <TicketsTable title={'Tickets to be reviewed'}
                tickets={tickets.filter(ticket => ticket.status == 2)}
                toggleAddBtn={toggleAddBtn}
                setReviewStatus= {setReviewStatus}
            />
        </section>
    );
};