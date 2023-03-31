import React, { useContext, useState } from 'react'
import { StatsBar } from '../components/statsbar/StatsBar';
import { TicketBoard } from '../components/ticketboard/TicketBoard';
import { TicketsTable } from '../components/ticketboard/ticketstable/TicketsTable';
import { TicketsContext } from '../context/TicketsProvider';
import { TicketsContextType } from '../types';
// import './pages.css';

export const Archive = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])

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

    return (
         <section className="ticket-board">
            <TicketsTable title={'Archived tickets'}
                tickets={tickets.filter(ticket => ticket.archived == true)}
                toggleAddBtn={toggleAddBtn}
            />
        </section>
    );
};

