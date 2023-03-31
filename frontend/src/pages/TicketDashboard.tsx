import { useContext, useEffect, useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { TicketsContext } from "../context/TicketsProvider";
import { TicketsContextType } from "../types";

const TicketDashboard = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])

    const toggleAddBtn = (ticketId: number) => {
        if ( currentTicketIds.some(id => id == ticketId)) {
            setCurrentTicketIds([...currentTicketIds.filter(id => id !== ticketId)]);
        } else {
            setCurrentTicketIds([...currentTicketIds, ticketId]);
            setAddToggleBtn(true);
        }
    }

    useEffect(() => {
        if (currentTicketIds.length  == 0 ) {
            setAddToggleBtn(false)
        }
    }, [currentTicketIds])

    const resetTicketsClaims = () => {
        setCurrentTicketIds([]);
        setAddToggleBtn(false);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketIds={currentTicketIds} resetTicketsClaims={resetTicketsClaims}/>
            <TicketBoard toggleAddBtn={toggleAddBtn} tickets={tickets} />
        </>
    );
};

export default TicketDashboard;
