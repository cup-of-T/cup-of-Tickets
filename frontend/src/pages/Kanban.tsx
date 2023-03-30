import { useContext } from "react";
import KanbanBoard from "../components/kanban/KanbanBoard";
import Loader from "../components/loader/Loader";
import { TicketsContext } from "../context/TicketsProvider";
import { UserContext } from "../context/UserProvider";
import { TicketsContextType, UserContextType } from "../types";

interface IKanbanProps {
}

const Kanban = ({ }: IKanbanProps) => {
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const { dbUser } = useContext(UserContext) as UserContextType;
    if (dbUser == null) {
        return null;
    }
    return (
        <>
            <h2>My Tickets</h2>
            <KanbanBoard tickets={tickets?.filter(tic => tic.assignedUser?.userId == dbUser?.userId)} />
        </>
    );
};

export default Kanban;
