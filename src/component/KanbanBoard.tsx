import PlusIcon from "../icons/PlusIcon.tsx";
import {useMemo, useState} from "react";
import {Column, Id} from "../types.ts";
import ColumnContainer from "./ColumnContainer.tsx";
import {DndContext, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";
import {createPortal} from "react-dom";


function KanbanBoard() {
    const [colums, setColums] = useState<Array<Column>>([])
    const columsId = useMemo(() => colums.map((col) => col.id), [colums])

    const [activeColumn, setActiveColumn] = useState<Column | null>(null)


    function generateId() {
        return Math.floor(Math.random() * 10001);
    }

    function createNewColumn() {
        const columnToAdd = {
            id: generateId(),
            title: `Столбец${colums.length + 1}`,
        }

        setColums([...colums, columnToAdd])

    }

    function deleteColumn(id: Id) {
        const filteredColumns = colums.filter(col => col.id !== id)
        setColums(filteredColumns)
    }

    function onDragStart(e: DragStartEvent) {
        console.log(e)
        if (e.active.data.current?.type === "Column") {
            setActiveColumn(e.active.data.current.column)
            return

        }
    }

    return (
        <div className="
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
        ">
            <DndContext onDragStart={onDragStart}>
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        <SortableContext items={columsId}>
                            {colums.map((col) =>
                                (<ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/>))}
                        </SortableContext>
                    </div>
                    <button onClick={createNewColumn} className="
                    h-[60px]
                    w-[350px]
                    min-w-[350px]
                    cursor-pointer
                    bg-mainBackgroundColor
                    border-2
                    border-columnBackgroundColor
                    p-4
                    ring-rose-500
                    hover:ring-2
                    flex
                    gap-2
            "><PlusIcon/>Добавить столбец
                    </button>
                </div>
                {createPortal(<DragOverlay>
                    {activeColumn &&
                     <ColumnContainer
                         column={activeColumn}
                         deleteColumn={deleteColumn}/>
                    }
                </DragOverlay>,document.body
                )}
            </DndContext>
        </div>);
}

export default KanbanBoard