import { useState } from "react";
import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";

interface IHomeProps {
}

const Home = ({ }: IHomeProps) => {
    const [addBtnToggle, setAddToggleBtn] = useState(false);

    const toggleAddBtn = () => {
        // toggleAddBtn needs to take and id 
        setAddToggleBtn(!addBtnToggle);
    }

    return (
        <>
            <StatsBar addBtnToggle={addBtnToggle}/>
            <TicketBoard toggleAddBtn={toggleAddBtn}/>
        </>
    );
};

export default Home;
