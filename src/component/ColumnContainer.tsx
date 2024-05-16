import {Column} from "../types.ts";

interface IProps {
    column: Column
}

function ColumnContainer(props: IProps) {
    const {column} = props
    return (
        <div className="
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounden-md
        flex
        flex-col
        "
            key={column.id}>
            {column.title}

        </div>);
}

export default ColumnContainer