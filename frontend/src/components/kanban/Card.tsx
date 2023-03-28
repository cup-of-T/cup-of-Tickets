import { useSortable } from '@dnd-kit/sortable';
import { ITicket } from "../../interfaces/interface";
import { CSS } from "@dnd-kit/utilities";
import './Card.css'

interface ICardProps {
    ticket: ITicket,
    parent?: string | null,
}

const Card = ({ ticket, parent = null }: ICardProps) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: ticket.ticketId,
        data: { title: ticket.title, index: ticket.ticketId, parent },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };


    return (
        <div {...listeners} style={style} {...attributes} ref={setNodeRef}>
            <div className="card">
                <h5 className="card__title">{ticket.title} #{ticket.ticketId}</h5>
                <section className="card__description">
                    <p>{ticket.description}</p>
                    <p className="card__time-estimate">time estimate: {ticket.timeEstimate}</p> 
                    <p className="card__time-estimate">created: {ticket.createdAt}</p>
                    <p className="card__time-estimate">requested by: {ticket.creator.email}</p>
                </section>
            </div>
        </div>
    );
};

export default Card;