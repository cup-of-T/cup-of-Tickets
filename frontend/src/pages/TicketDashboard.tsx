import { useEffect, useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
interface IDashboardProps {
}

const TicketDashboard = ({ }: IDashboardProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
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

    // useEffect(() => {
        
    // }, [])

    const resetTicketsClaims = () => {
        setCurrentTicketIds([]);
        setAddToggleBtn(false);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketIds={currentTicketIds} resetTicketsClaims={resetTicketsClaims}/>
            <TicketBoard toggleAddBtn={toggleAddBtn} />
        </>
    );
};

export default TicketDashboard;
