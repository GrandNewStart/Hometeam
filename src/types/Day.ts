import DateTimeProps from "./DateTime"
import TaskProps from "./Task"

interface DayProps {
    dateTime: DateTimeProps
    teamId: string,
    tasks: TaskProps[]
}

export default DayProps