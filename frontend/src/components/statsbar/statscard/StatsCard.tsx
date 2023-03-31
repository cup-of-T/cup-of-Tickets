import { useContext } from "react";
import { TicketsContext } from "../../../context/TicketsProvider";

import { TicketsContextType, UserContextType } from "../../../types";

export const StatsCard = () => {
  const { tickets } = useContext(TicketsContext) as TicketsContextType;

  return (
    <div className="stats-card">
      <div className="stats-card__header">Completed tickets statistics (today)</div>
      <div className="stats-card__content">
        <div className="stats-card__content-square border-left">
          <strong>{tickets?.filter(ticket => ticket.status == 4).filter(ticket => new Date(ticket.createdAt).toDateString() == new Date().toDateString()).length}</strong>
          ALL
        </div>
        <div className="stats-card__content-square">
        <strong>{tickets?.filter(ticket => ticket.status == 4).filter(ticket => ticket.urgency == 2).filter(ticket => new Date(ticket.createdAt).toDateString() == new Date().toDateString()).length}</strong>
          URGENT
        </div>
      </div>
    </div>
  );
};
