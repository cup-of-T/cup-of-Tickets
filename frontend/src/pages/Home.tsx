import { StatsBar } from "../components/statsbar/StatsBar";
import { TicketBoard } from "../components/ticketboard/TicketBoard";

interface IHomeProps {
}

const Home = ({ }: IHomeProps) => {
    return (
        <>
            <StatsBar />
            <TicketBoard />
        </>
    );
};

export default Home;
