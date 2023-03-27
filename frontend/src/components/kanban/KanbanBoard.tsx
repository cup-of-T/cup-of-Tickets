import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, rectIntersection } from "@dnd-kit/core";
import { useContext, useState } from "react";
import { find } from "lodash";
import { TicketsContext } from "../../context/TicketsProvider";
import { IColumn, ITicket } from "../../interfaces/interface";
import { TicketsContextType } from "../../types";
import Column from "./Column";
import './KanbanBoard.css'
import Card from "./Card";
import {
    arrayMove
} from '@dnd-kit/sortable';

interface IKanbanBoardProps {
}


export const findBoardSectionContainer = (
    boardSections: IColumn,
    id: number
) => {
    if (id in boardSections) {
        return id;
    }

    const container = Object.keys(boardSections).find((key) =>
        boardSections[key].find((item) => item.ticketId === id)
    );
    return container;
};



const KanbanBoard = ({ }: IKanbanBoardProps) => {
    const { tickets } = useContext(TicketsContext) as TicketsContextType;
    const [active, setActive] = useState<null | number>(null);
    const [columns, setColumns] = useState<IColumn>({
        "to do": tickets.filter(ticket => ticket.status == 0),
        "Doing": tickets.filter(ticket => ticket.status == 1),
        "Done": tickets.filter(ticket => ticket.status == 2)
    });


    const handleDragStart = ({ active }: DragStartEvent) => {
        setActive(active.id as number);
    };

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        const activeContainer = findBoardSectionContainer(columns, active.id as number);
        const overContainer = findBoardSectionContainer(columns, over?.id as number);

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

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        const activeContainer = findBoardSectionContainer(columns, active.id as number);
        const overContainer = findBoardSectionContainer(columns, over?.id as number);

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const activeIndex = columns[activeContainer].findIndex(
            (task) => task.ticketId === active.id
        );
        const overIndex = columns[overContainer].findIndex(
            (task) => task.ticketId === over?.id
        );

        if (activeIndex !== overIndex) {
            setColumns((boardSection) => ({
                ...boardSection,
                [overContainer]: arrayMove(
                    boardSection[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }

        setActive(null);
    };

    var Tik = find(tickets, (task) => task.ticketId === active);

    return (
        <>
            <DndContext
                collisionDetection={rectIntersection}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
            >
                <div className="column-container">
                    {Object.keys(columns).map(column => <Column title={column} key={column} tickets={columns[column]} />)}
                </div>
                <DragOverlay dropAnimation={defaultDropAnimation}>
                    {Tik ? <Card ticket={Tik} /> : null}
                </DragOverlay>
            </DndContext>
        </>
    );
};

export default KanbanBoard;
