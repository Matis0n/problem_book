import {Id, Task} from "../types.ts";
import TrachIcon from "../icons/TrachIcon.tsx";
import {useState} from "react";

interface IProps {
    task: Task
    deleteTask:(id:Id)=>void
}

function TaskCard({task,deleteTask}: IProps) {
    const [mouseIsOver, setMouseIsOver] = useState(false)
    return (<div onMouseEnter={()=>{
        setMouseIsOver(true)
    }}
     onMouseLeave={()=>{setMouseIsOver(false)}}

    className="
        bg-mainBackgroundColor
        p-2.5
        h-[100px]
        min-h-[100px]
        items-center
        flex
        flex-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-rose-500
        cursor-grabs
        relative
        ">
        {task.content}
        {
            mouseIsOver &&
            <button onClick={()=>deleteTask(task.id)} className="stroke-white
                 absolute
                 right-4
                 top-1/2
                 -translate-y-1/2
                 bg-columnBackgroundColor
                 p-2
                 opacity-60
                 hover:opacity-100">
                <TrachIcon/>
            </button>
        }

    </div>);
}

export default TaskCard