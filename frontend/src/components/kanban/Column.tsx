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


    return (
        <div>
            <h5>{title}</h5>
            <div className="ticket-container" ref={setNodeRef}>
                <SortableContext
                    id={title}
                    items={tickets}
                    strategy={verticalListSortingStrategy}
                >
                    {tickets.map((ticket) => {
                        return (<Card parent={title} key={ticket.ticketId} ticket={ticket} />)
                    })}
                </SortableContext>
            </div>
        </div>
    );
};

export default Column;
