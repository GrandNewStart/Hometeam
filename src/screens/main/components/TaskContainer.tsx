import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import MemberProps from "../../../types/Member"
import TaskProps from "../../../types/Task"
import { useSelector, useDispatch } from 'react-redux'
import DayProps from "../../../types/Day"
import { updateDay } from "../../../store/redux/days"
import Colors from "../../../assets/Colors"

function Task({ task, onClick }) {
    const [color, setColor] = useState(Colors.tertiaryText)
    const [borderColor, setBorderColor] = useState(Colors.tertiaryText)
    const [textColor, setTextColor] = useState(Colors.white)
    
    useEffect(()=>{
        if (task.status === 'pending') {
            setColor(Colors.clear)
            setBorderColor(Colors.secondaryText)
            setTextColor(Colors.secondaryText)
        } else if (task.status === 'in_progress') {
            setColor(Colors.primaryBlue)
            setBorderColor(Colors.clear)
            setTextColor(Colors.white)
        } else if (task.status === 'done') {
            setColor(Colors.primaryGreen)
            setBorderColor(Colors.clear)
            setTextColor(Colors.white)
        }
    },[task])

    return (
        <TouchableOpacity onPress={()=>{onClick(task)}}>
            <View style={[styles.taskContainer, { backgroundColor: color, borderColor: borderColor}]}>
                <Text style={[styles.taskText, {color: textColor}]}>{task.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

function TaskContainer({ dateTime }) {
    const dispatch = useDispatch()
    const members: MemberProps[] = useSelector((state)=>state.members.list)
    const day: DayProps = useSelector((state)=>
        state.days.list.find( day =>
            {
                return day.dateTime.year === dateTime.year && 
                day.dateTime.month === dateTime.month && 
                day.dateTime.date === dateTime.date
            }
        )
    )

    function getGroupTasks() {
        return day ? day.tasks
            .filter(task=>task.status !== 'new')
            .filter(task=>task.memberIds.length > 1) : []
    }

    function getSoloTasks(member: MemberProps) {
        return day ? day.tasks
            .filter(task=>task.status !== 'new')
            .filter(task=>task.memberIds.length == 1)
            .filter(task=>task.memberIds[0] === member.id) : []
    }

    function taskClickHandler(task: TaskProps) {
        let updatedTasks = [...day.tasks]
        for (let i = 0; i < updatedTasks.length; i++) {
            if (task.id === updatedTasks[i].id) {
                if (updatedTasks[i].status === 'pending') {
                    updatedTasks[i] = {...updatedTasks[i], status: 'in_progress'}
                } else if (updatedTasks[i].status === 'in_progress') {
                    updatedTasks[i] = {...updatedTasks[i], status: 'done'}
                } else if (updatedTasks[i].status === 'done') {
                    updatedTasks[i] = {...updatedTasks[i], status: 'pending'}
                }
                break
            }
        }
        const updatedDay = {...day, tasks: updatedTasks}
        dispatch(updateDay(updatedDay))
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>공동 작업</Text>
                { getGroupTasks().map(task => <Task key={task.id} task={task} onClick={taskClickHandler}/>) }
            </View>
            {
                members.map(member => {
                    return (
                        <View style={styles.container} key={member.id}>
                            <Text style={styles.title}>{`${member.name}의 작업`}</Text>
                            { getSoloTasks(member).map(task => <Task key={task.id} task={task} onClick={taskClickHandler}/>) }
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 16
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        marginHorizontal: 8
    },
    taskContainer: {
        borderRadius: 5,
        borderWidth: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        height: 50
    },
    taskText: {
        fontSize: 18,
        fontWeight: '600'
    },
    taskRadioButton: {
        width: 20,
        height: 20
    }
})

export default TaskContainer