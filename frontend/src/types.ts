import { ITicket, IUser } from "./interfaces/interface";

export type TicketsContextType = {
    tickets: ITicket[];
    setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
    fetchTickets: () => void;
    updateTicketAssignee: (ticketId: number, userId: number) => void;
    patchTicketsStatus: (ticketId: number, status: number) => void;
    postingTicket: (ticket : Partial<ITicket>) => void;
    deletingTicket: (ticketId: number) => void;
};

export type UserContextType = {
    dbUser: IUser;
    setDbUser: React.Dispatch<React.SetStateAction<IUser>>;
};