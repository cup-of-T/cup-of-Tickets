import { ITicket, IUser } from "./interfaces/interface";

export type TicketsContextType = {
    tickets: ITicket[];
    setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
<<<<<<< HEAD
    fetchTickets: () => void;
    updateTicketAssignee: (ticketId: number, userId: number) => void;
    patchTicketsStatus: (ticketId: number, status: number) => void;
    postingTicket: (ticket : Partial<ITicket>) => void;
=======
    fetchTickets: (teamId: number) => void;
    updateTicketAssignee: (ticketId: number, userId: number) => void;
    patchTicketsStatus: (ticketId: number, status: number) => void;
    postingTicket: (ticket: Partial<ITicket>) => void;
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
    deletingTicket: (ticketId: number) => void;
};

export type UserContextType = {
    dbUser: IUser;
    setDbUser: React.Dispatch<React.SetStateAction<IUser>>;
};
