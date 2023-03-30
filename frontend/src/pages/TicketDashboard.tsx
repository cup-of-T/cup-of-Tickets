import { useContext, useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { TicketsContext } from "../context/TicketsProvider";
import { TicketsContextType } from "../types";
interface IDashboardProps {
}

const TicketDashboard = ({ }: IDashboardProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [currentTicketId, setCurrentTicketId] = useState<number>(0);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;


    const toggleAddBtn = (ticketId: number) => {
        setCurrentTicketId(ticketId);
        // toggleAddBtn needs to take and id 
        setAddToggleBtn(!addBtnToggle);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketId={currentTicketId} />
            <TicketBoard toggleAddBtn={toggleAddBtn} tickets={tickets} />
        </>
    );
};

export default TicketDashboard;
