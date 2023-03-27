import { useSortable } from '@dnd-kit/sortable';
import { ITicket } from "../../interfaces/interface";
import { CSS } from "@dnd-kit/utilities";
import './Card.css'

interface ICardProps {
    ticket: ITicket,
    parent?: string | null,
}

const Card = ({ ticket, parent = null }: ICardProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: ticket.ticketId,
        data: { title: ticket.title, index: ticket.ticketId, parent }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div {...listeners} style={style} {...attributes} ref={setNodeRef}>
            <div className="card">{ticket.title}</div>
        </div>
    );
};

export default Card;