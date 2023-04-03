import { useContext } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { TicketsContextType, UserContextType } from '../types';

export const InProgress = () => {
    const { tickets } = useContext(TicketsContext) as TicketsContextType;

    const filteredTicketByStatus = tickets.filter(ticket => ticket.status == 1);

    return (
        <section className="ticket-board">
            <TicketsTable title={'In Progress tickets'}
                tickets={filteredTicketByStatus}
            />
        </section>
    );
};


