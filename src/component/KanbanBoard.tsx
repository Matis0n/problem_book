import PlusIcon from "../icons/PlusIcon.tsx";
import {useMemo, useState} from "react";
import {Column, Id, Task} from "../types.ts";
import ColumnContainer from "./ColumnContainer.tsx";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {createPortal} from "react-dom";


function KanbanBoard() {
    const [columns, setColumns] = useState<Array<Column>>([])
    const columsId = useMemo(() => columns.map((col) => col.id), [columns])
    const [tasks, setTasks] = useState<Task[]>([])

    const [activeColumn, setActiveColumn] = useState<Column | null>(null)

    const sensors = useSensors(useSensor(PointerSensor,{
        activationConstraint:{
            distance:3 //3px
        }
    }))

    function generateId() {
        return Math.floor(Math.random() * 10001);
    }

    function createNewColumn() {
        const columnToAdd = {
            id: generateId(),
            title: `Столбец${columns.length + 1}`,
        }

        setColumns([...columns, columnToAdd])

    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter(col => col.id !== id)
        setColumns(filteredColumns)
    }

    function updateColumn(id:Id, title:string){
        const newColumns = columns.map(col=>{
            if(col.id!==id)
                return col

            return{...col,title}
        })
        setColumns(newColumns)
    }

    function createTask(columnId:Id){
        const newTask:Task={
            id:generateId(),
            columnId,
            content:`Задача ${tasks.length+1}`
        }
        setTasks([...tasks,newTask])
    }
    function deleteTask(id:Id){
        const newTask = tasks.filter((tack)=>tack.id!==id)
        setTasks(newTask)
    }
    function onDragStart(event: DragStartEvent) {
        console.log(event)
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return

        }
    }

    function onDragEnd(event: DragEndEvent) {
        const {active, over} = event
        if (!over)
            return
        const activeColumnId = active.id
        const overColumnID = over.id
        if (activeColumnId === overColumnID)
            return

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId)
            const overColumnIndex = columns.findIndex((col)=>(col.id=== overColumnID))

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
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
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        <SortableContext items={columsId}>
                            {columns.map((col) =>
                                (<ColumnContainer key={col.id}
                                                  column={col}
                                                  deleteColumn={deleteColumn}
                                                  updateColumn = {updateColumn}
                                                  createTask = {createTask}
                                                  tasks = {tasks.filter((task)=>task.columnId === col.id)}
                                                  deleteTask = {deleteTask}
                                />))}
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
                                deleteColumn={deleteColumn}
                                updateColumn = {updateColumn}
                                createTask = {createTask}
                                tasks = {tasks.filter((task)=>task.columnId === activeColumn.id)}
                                deleteTask = {deleteTask}
                            />
                        }
                    </DragOverlay>, document.body
                )}
            </DndContext>
        </div>);
}

export default KanbanBoard