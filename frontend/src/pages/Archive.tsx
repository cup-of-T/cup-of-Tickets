import React, { useContext, useState } from 'react'
import { StatsBar } from '../components/statsbar/StatsBar';
import { TicketBoard } from '../components/ticketboard/TicketBoard';
import { TicketsContext } from '../context/TicketsProvider';
import { TicketsContextType } from '../types';
// import './pages.css';

export const Archive = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [currentTicketId, setCurrentTicketId] = useState<number>(0);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;

    const toggleAddBtn = (ticketId: number) => {
        setCurrentTicketId(ticketId);
        setAddToggleBtn(!addBtnToggle);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketId={currentTicketId} />
            <h3 className='container center archive-page__title'>Archived tickets</h3>
            <TicketBoard toggleAddBtn={toggleAddBtn} tickets={tickets?.filter(ticket => ticket.archived == true )} />
        </>
    );
};

