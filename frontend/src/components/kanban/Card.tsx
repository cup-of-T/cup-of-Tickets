import { useSortable } from "@dnd-kit/sortable";
import { ITicket } from "../../interfaces/interface";
import { CSS } from "@dnd-kit/utilities";
import "./Card.css";
import { SyntheticEvent, useContext, useState } from "react";
import { TicketsContextType } from "../../types";
import { TicketsContext } from "../../context/TicketsProvider";

interface ICardProps {
  ticket: ITicket;
  parent?: string | null;
}

const Card = ({ ticket, parent = null }: ICardProps) => {
  const [show, setShow] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: ticket.ticketId,
    data: { title: ticket.title, index: ticket.ticketId, parent },
  });
  const { tickets, setTickets } = useContext(TicketsContext) as TicketsContextType;

  const onCloseClick = (e: SyntheticEvent) => {
    let newArr = {...tickets};
    const i = newArr.findIndex(t => t.ticketId == ticket.ticketId);
    newArr[i].archived == true;
    setTickets(newArr);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };
  const urgencyColors = ["#51b53f", "#FF9E19", "#FF9E19"];

  return (
    <div {...listeners} style={style} {...attributes} ref={setNodeRef}>
      <div className="card" onClick={() => setShow(!show)}>
        <section className="card__description">
          <div className="card__label">
            <span
              className="card__status"
              style={{ backgroundColor: urgencyColors[ticket.urgency] }}
            ></span>
          </div>
          <div className="card__title-container">
            <h5 className="card__title">
              {ticket.title} #{ticket.ticketId}
            </h5>
          </div>
          {show && (
            <div>
              <p className="card__time-description">{ticket.description}</p>
              <p className="card__time-estimate">
                <i className="fa-regular fa-clock"></i>
                {ticket.timeEstimate}
              </p>
              <p className="card__time-estimate">
                <i className="fa-regular fa-calendar"></i> {ticket.createdAt}
              </p>
              <p className="card__time-estimate">
                <i className="fa-solid fa-user"></i> {ticket.creator.email}
              </p>
            </div>
          )}

          <div className="card__user-container">
            <button className="user-container__button">
              {show ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </button>
            <div className="card--deletable">
              {ticket.status == 2 && (
                <button onClick={onCloseClick} className="btn btn--red">Close</button>
              )}
              {ticket.assignedUser && (
                <img
                  className="card__assigned-user"
                  src={ticket.assignedUser.imageUrl}
                  alt={ticket.assignedUser.email}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Card;
