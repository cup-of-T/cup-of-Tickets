import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { TicketsContext } from "../../context/TicketsProvider";
import { IColumn, Istatuses, ITicket } from "../../interfaces/interface";
import { TicketsContextType } from "../../types";
import Column from "./Column";
import './KanbanBoard.css'
import Card from "./Card";
import { arrayMove } from '@dnd-kit/sortable';
import { updateTicketStatus } from "../../services/ticketApi";
import { useAuth0 } from "@auth0/auth0-react";

type KanbanBoardProps = {
    filteredTickets: ITicket[]
}

const findTicketContainer = (columns: IColumn, id: number) => {
    if (id in columns) {
        return id;
    }

    const container = Object.keys(columns).find(key =>
        columns[key].find(ticket => ticket.ticketId === id));

    return container;
};



const KanbanBoard: React.FC<KanbanBoardProps> = ({ filteredTickets }) => {
    const { tickets, setTickets } = useContext(TicketsContext) as TicketsContextType;
    const { getAccessTokenSilently } = useAuth0();
    const [active, setActive] = useState<null | number>(null);
    const [columns, setColumns] = useState<IColumn>({
        "To Do": filteredTickets.filter(ticket => ticket.status == 0),
        "Doing": filteredTickets.filter(ticket => ticket.status == 1),
        "Done": filteredTickets.filter(ticket => ticket.status >= 2)
    });
    const activeTicket = find(filteredTickets, (task) => task.ticketId === active);
    const ticketStatuses = {
        "To Do": 0,
        "Doing": 1,
        "Done": 2
    } as Istatuses;
    const handleDragStart = ({ active }: DragStartEvent) => {
        setActive(active.id as number);
    };

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        const activeContainer = findTicketContainer(columns, active.id as number);
        const overContainer = findTicketContainer(columns, over?.id as number);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setColumns((prevState) => {
            const activeItems = prevState[activeContainer];
            const overItems = prevState[overContainer];
            const activeIndex = activeItems.findIndex((item) => item.ticketId === active.id);
            const overIndex = overItems.findIndex((item) => item.ticketId !== over?.id);

            return {
                ...prevState,
                [activeContainer]: [
                    ...prevState[activeContainer].filter(
                        (item) => item.ticketId !== active.id
                    ),
                ],
                [overContainer]: [
                    ...prevState[overContainer].slice(0, overIndex),
                    columns[activeContainer][activeIndex],
                    ...prevState[overContainer].slice(
                        overIndex,
                        prevState[overContainer].length
                    ),
                ],
            };
        });
    };

    const handleDragEnd = async ({ active, over }: DragEndEvent) => {
        const activeContainer = findTicketContainer(columns, active.id as number);
        const overContainer = findTicketContainer(columns, over?.id as number);

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const activeIndex = columns[activeContainer].findIndex(
            (ticket) => ticket.ticketId === active.id
        );
        const overIndex = columns[overContainer].findIndex(
            (ticket) => ticket.ticketId === over?.id
        );

        if (activeIndex !== overIndex) {
            setColumns((prevState) => ({
                ...prevState,
                [overContainer]: arrayMove(
                    prevState[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }

        updateTicketStatus(active.id as number, ticketStatuses[activeContainer], await getAccessTokenSilently());
        let newArr = [ ...tickets ];
        const i = tickets.findIndex(t => t.ticketId == active.id);
        newArr[i].status = ticketStatuses[activeContainer];
        setTickets(newArr);
        setActive(null);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    return (
        <section className="kanban-container">
            <h3 className="center page__title align-center">My Tickets</h3>

            <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
            >
                <div className="columns-container">
                    {Object.keys(columns).map(column => <Column title={column} key={column} tickets={columns[column]} />)}
                </div>
                <DragOverlay dropAnimation={defaultDropAnimation}>
                    {activeTicket ? <Card ticket={activeTicket} /> : null}
                </DragOverlay>
            </DndContext>
        </section>
    );
};

export default KanbanBoard;
