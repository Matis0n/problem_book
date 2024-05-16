import PlusIcon from "../icons/PlusIcon.tsx";
import {useState} from "react";
import {Column} from "../types.ts";
import ColumnContainer from "./ColumnContainer.tsx";

function KanbanBoard() {
    const [colums, setColums] = useState<Array<Column>>([])

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
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">{colums.map((col) =>
                    (<ColumnContainer column={col}/>))}
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

        </div>);
}

export default KanbanBoard