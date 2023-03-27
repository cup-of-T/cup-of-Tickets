import { useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";
import { ITicket } from "../interfaces/interface";

interface IHomeProps {
}

const Home = ({ }: IHomeProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);
    const [currentTicket, setCurrentTicket] = useState<ITicket>()

    const toggleAddBtn = (ticket: ITicket) => {
        setCurrentTicket(ticket);
        // toggleAddBtn needs to take and id 
        setAddToggleBtn(!addBtnToggle);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle} ticket={currentTicket}/>
            <TicketBoard toggleAddBtn={toggleAddBtn}/>
        </>
    );
};

export default Home;
