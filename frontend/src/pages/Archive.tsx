import React, { useContext, useState } from 'react'
import { StatsBar } from '../components/statsbar/StatsBar';
import { TicketBoard } from '../components/ticketboard/TicketBoard';
import { TicketsContext } from '../context/TicketsProvider';
import { TicketsContextType } from '../types';
// import './pages.css';

export const Archive = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([]);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;

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

    const resetTicketsClaims = () => {
        setCurrentTicketIds([]);
        setAddToggleBtn(false);
    }


    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketIds={currentTicketIds} resetTicketsClaims={resetTicketsClaims}/>
            <h3 className='container center page__title'>Archived tickets</h3>
            <TicketBoard toggleAddBtn={toggleAddBtn} tickets={tickets?.filter(ticket => ticket.archived == true )} />
        </>
    );
};

