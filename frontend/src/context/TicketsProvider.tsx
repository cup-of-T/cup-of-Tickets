import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { IAssigneeRequest, ITicket } from "../interfaces/interface";
import { getTickets, postTicket, deleteTicket, updateTicketStatus, updateTicketAssignedTo } from "../services/ticketApi";

interface TicketsProviderProps {
    children: React.ReactNode
}

export const TicketsContext = createContext({});

const TicketProvider = ({ children }: TicketsProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const [tickets, setTickets] = useState<ITicket[]>([]);

    const fetchTickets = async () => {
        const accessToken = await getAccessTokenSilently();
        setTickets(await getTickets(accessToken));
    }

    const updateTicketAssignee = async (ticketId : number, userId: number) => {
        const accessToken = await getAccessTokenSilently();
        setTickets(await updateTicketAssignedTo(ticketId, userId, accessToken)); 
    }

    const postingTicket = async (ticket: ITicket) => {
        const accessToken = await getAccessTokenSilently();
        const response = await postTicket(ticket, accessToken);
        setTickets(prevState => [ticket, ...prevState]);
    }

    const deletingTicket = async (ticket: ITicket) => {
        const accessToken = await getAccessTokenSilently();
        const response = await deleteTicket(ticket.ticketId, accessToken);
        setTickets(prevState => prevState.filter(filteredTicket => filteredTicket.ticketId != ticket.ticketId));
    }

    return (
        <TicketsContext.Provider value={{ tickets, setTickets, fetchTickets, deletingTicket, updateTicketAssignee, postingTicket }}>
            {children}
        </TicketsContext.Provider>
    );
}

export default TicketProvider;
