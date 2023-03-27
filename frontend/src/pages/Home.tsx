import { useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { ITicket } from "../interfaces/interface";

interface IHomeProps {
}

const Home = ({ }: IHomeProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [currentTicketId, setCurrentTicketId] = useState<number>(0)

    const toggleAddBtn = (ticketId : number) => {
        setCurrentTicket(ticketId);
        // toggleAddBtn needs to take and id 
        setAddToggleBtn(!addBtnToggle);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticketId={currentTicketId}/>
            <TicketBoard toggleAddBtn={toggleAddBtn}/>
        </>
    );
};

export default Home;
