import { ITicket, IUser } from "./interfaces/interface";

export type TicketsContextType = {
    tickets: ITicket[];
    setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
    fetchTickets: () => void;
    postingTicket: () => void;
    deletingTicket: () => void;
};

export type UsersContextType = {
    users: IUser[];
    setusers: React.Dispatch<React.SetStateAction<IUser[]>>;
    fetchUsers: () => void;
    postingUser: () => void;
};