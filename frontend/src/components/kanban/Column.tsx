import { useDroppable } from "@dnd-kit/core";
import { ITicket } from "../../interfaces/interface";
import Card from "./Card";
import './Column.css';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface IColumnProps {
    title: string
    tickets: ITicket[]
}

const Column = ({ title, tickets }: IColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: title
    });


    const items = tickets.map(item => ({ ...item, id: item.ticketId }));

    return (
        <div className="column-container">
            <SortableContext
                id={title}
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <h3 className="column-title">{title}</h3>
                <div className="ticket-container" ref={setNodeRef}>
                    {tickets.map((ticket) => {
                        return (<Card parent={title} key={ticket.ticketId} ticket={ticket} />)
                    })}
                </div>
            </SortableContext >
        </div >
    );
};

export default Column;
