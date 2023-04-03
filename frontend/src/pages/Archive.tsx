import { useContext } from 'react'
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { TicketsContextType } from '../types';

export const Archive = () => {

    const { tickets } = useContext(TicketsContext) as TicketsContextType;

    return (
         <section className="ticket-board">
            <TicketsTable title={'Archived tickets'}
                tickets={tickets.filter(ticket => ticket.archived == true && ticket.status == 4 )}
            />
        </section>
    );
};

