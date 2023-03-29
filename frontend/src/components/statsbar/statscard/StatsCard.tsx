
export const StatsCard = () => {
  return (
    <div className="stats-card">
      <div className="stats-card__header">Tickets statistics (this week)</div>
      <div className="stats-card__content">
        <div className="stats-card__content-square">
          <strong>0</strong>
          Urgent
        </div>
        <div className="stats-card__content-square border-left">
          <strong>3</strong>
          Complexity
        </div>
      </div>
    </div>
  );
};
