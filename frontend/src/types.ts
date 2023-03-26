import { ITicket } from "./interfaces/interface";

export type TicketsContextType = {
    tickets: ITicket[];
    setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
    fetchTickets: () => void;
    postingTicket: () => void;
    deletingTicket: () => void;
};