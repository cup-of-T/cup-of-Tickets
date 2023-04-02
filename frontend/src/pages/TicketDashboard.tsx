import { useContext, useEffect, useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { TicketsContext } from "../context/TicketsProvider";
import { ITicket } from "../interfaces/interface";
import { TicketsContextType } from "../types";

const TicketDashboard = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])

    console.log(showAlert);

    const toggleAddBtn = (ticketId: number) => {
        if (currentTicketIds.some(id => id == ticketId)) {
            setCurrentTicketIds([...currentTicketIds.filter(id => id !== ticketId)]);
        } else {
            setCurrentTicketIds([...currentTicketIds, ticketId]);
            setAddToggleBtn(true);
        }
    }

    useEffect(() => {
        if (currentTicketIds.length == 0) {
            setAddToggleBtn(false)
        }

        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
        }
    }, [currentTicketIds])

    const resetTicketsClaims = () => {
        setCurrentTicketIds([]);
        setAddToggleBtn(false);
    }

    return (
        <>
            <StatsBar setShowAlert={setShowAlert} addBtnToggle={addBtnToggle} ticketIds={currentTicketIds} resetTicketsClaims={resetTicketsClaims} />
            <TicketBoard showAlert={showAlert} toggleAddBtn={toggleAddBtn} tickets={tickets} />
        </>
    );
};

export default TicketDashboard;
