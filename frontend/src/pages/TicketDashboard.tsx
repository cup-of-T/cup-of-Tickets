import { useContext, useEffect, useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { TicketsContext } from "../context/TicketsProvider";
import { ITicket } from "../interfaces/interface";
import { TicketsContextType } from "../types";

<<<<<<< HEAD
const TicketDashboard = () => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { tickets} = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])
    
=======
type TicketDashboardProps = {
    teamName: string
}

const TicketDashboard = ({ teamName }: TicketDashboardProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [currentTicketIds, setCurrentTicketIds] = useState<number[]>([])

>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
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
<<<<<<< HEAD
    }, [currentTicketIds, showAlert])
=======
    }, [currentTicketIds])
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7

    const resetTicketsClaims = () => {
        setCurrentTicketIds([]);
        setAddToggleBtn(false);
    }

    return (
        <>
            <StatsBar setShowAlert={setShowAlert} addBtnToggle={addBtnToggle} ticketIds={currentTicketIds} resetTicketsClaims={resetTicketsClaims} />
<<<<<<< HEAD
            <TicketBoard showAlert={showAlert} toggleAddBtn={toggleAddBtn} tickets={tickets} />
=======
            <TicketBoard showAlert={showAlert} toggleAddBtn={toggleAddBtn} tickets={tickets} teamName={teamName} />
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
        </>
    );
};

export default TicketDashboard;
