import { useSortable } from "@dnd-kit/sortable";
import { ITicket } from "../../interfaces/interface";
import { CSS } from "@dnd-kit/utilities";
import "./Card.css";
import { SyntheticEvent, useContext, useState } from "react";
import { TicketsContextType } from "../../types";
import { TicketsContext } from "../../context/TicketsProvider";
import { updateTicketArchived } from "../../services/ticketApi";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { getAccessTokenSilently } = useAuth0();

  const onCloseClick = async (e: SyntheticEvent) => {
    const accessToken = await getAccessTokenSilently();
    updateTicketArchived(ticket.ticketId, true, accessToken);

    let newArr = [...tickets];
    const i = newArr.findIndex(t => t.ticketId == ticket.ticketId);
    newArr[i].archived = true;
    setTickets(newArr);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };
  const urgencyColors = ["#51b53f", "#FF9E19", "#a30000"];

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
              {ticket.status == 4 && (
                <button onClick={onCloseClick} className="btn btn--grey">Close</button>
              )}
                 {ticket.status == 2 && (
                <p>Pending review...</p>
              )}
              
              {ticket.status == 3 && (
                <p>Changes requested...</p>
              )}
              {ticket.assignedUser && (
                <img
                  className="card__assigned-user"
                  src={import.meta.env.VITE_API_SERVER_URL + '/Images/' + ticket.assignedUser.imageUrl}
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
