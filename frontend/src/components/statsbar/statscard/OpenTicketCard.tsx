import { useContext } from "react";
import { TicketsContext } from "../../../context/TicketsProvider";
import { UserContext } from "../../../context/UserProvider";
import { TicketsContextType, UserContextType } from "../../../types";

export const OpenTicketCard = () => {
  const { tickets } = useContext(TicketsContext) as TicketsContextType;
  const { dbUser } = useContext(UserContext) as UserContextType;

  return (
    <div className="stats-card">
      <div className="stats-card__header">Open tickets (current)</div>
      <div className="stats-card__content">
        <div className="stats-card__content-square">
          <strong>{tickets.filter(ticket => (ticket?.assignedUser?.userId == dbUser?.userId) && ticket?.archived !== true).length}</strong>
          YOU
        </div>
        <div className="stats-card__content-square border-left">
        <strong>{tickets.filter(ticket => ticket?.status != 2 && ticket?.archived !== true).length}</strong>
          TEAM
        </div>
      </div>
    </div>
  );
};
