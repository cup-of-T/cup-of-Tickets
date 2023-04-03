import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useState } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { ITicket } from '../interfaces/interface';
import { updateTicketStatus } from '../services/ticketApi';
import { TicketsContextType, UserContextType } from '../types';

export const Testing = () => {
    const { tickets, setTickets} = useContext(TicketsContext) as TicketsContextType;
    const { getAccessTokenSilently } = useAuth0();
    const [filteredTicketsByStatus, setFilteredTicketsByStatus] = useState<ITicket[]>();

    const setReviewStatus = async (ticketId : number, status : number) => {
        
        updateTicketStatus(ticketId, status, await getAccessTokenSilently());
        const newArray = [...tickets];
        const i =  newArray.findIndex(t => t.ticketId == ticketId);
        newArray[i].status = status;
        setFilteredTicketsByStatus(newArray);
    }

    return (
         <section className="ticket-board">
            <TicketsTable title={'Tickets to be reviewed'}
                tickets={tickets.filter(ticket => ticket.status == 2)}
                setReviewStatus= {setReviewStatus}
            />
        </section>
    );
};