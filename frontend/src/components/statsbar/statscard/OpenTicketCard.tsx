import React from "react";

export const OpenTicketCard = () => {
  return (
    <div className="stats-card">
      <div className="stats-card__header">Open tickets (current)</div>
      <div className="stats-card__content">
        <div className="stats-card__content-square">
          <strong>3</strong>
          YOU
        </div>
        <div className="stats-card__content-square border-left">
          <strong>3</strong>
          GROUP
        </div>
      </div>
    </div>
  );
};
