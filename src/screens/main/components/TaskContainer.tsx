import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import MemberProps from "../../../types/Member"
import TaskProps from "../../../types/Task"
import { useSelector, useDispatch } from 'react-redux'
import DayProps from "../../../types/Day"
import { updateDay } from "../../../store/redux/days"

function Separator() {
    return <View style={{height: 2, backgroundColor: '#CCCCCC', marginTop: 16 }}/>
}

function Task({ task, onClick }) {
    function getImageSource() {
        if (task.status == 'pending') {
            return require('../../../assets/images/radio_gray.png')
        }
        if (task.status == 'in_progress') {
            return require('../../../assets/images/radio_blue.png')
        }
        if (task.status == 'done') {
            return require('../../../assets/images/radio_green.png')
        }
        if (task.status == 'failed') {
            return require('../../../assets/images/radio_red.png')
        }
        return null
    }
    const [imageSource, setImageSource] = useState(null)
    const [borderColor, setBorderColor] = useState('#CCCCCC')
    
    useEffect(()=>{
        setImageSource(getImageSource())
        if (task.status === 'pending') {
            setBorderColor('#CCCCCC')
        } else if (task.status === 'in_progress') {
            setBorderColor('#83C2EA')
        } else if (task.status === 'done') {
            setBorderColor('#69CC7F')
        }
    },[task])

    return (
        <TouchableOpacity onPress={()=>{onClick(task)}}>
            <View style={[styles.taskContainer, {borderColor: borderColor}]}>
                <Text style={styles.taskText}>{task.name}</Text>
                <Image style={styles.taskRadioButton} source={imageSource}/>
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
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.title}>공동 작업</Text>
                { getGroupTasks().map(task => <Task key={task.id} task={task} onClick={taskClickHandler}/>) }
            </View>
            <Separator/>
            {
                members.map(member => {
                    return (
                        <View style={styles.subContainer} key={member.id}>
                            <Text style={styles.title}>{`${member.name}의 작업`}</Text>
                            { getSoloTasks(member).map(task => <Task key={task.id} task={task} onClick={taskClickHandler}/>) }
                            <Separator/>
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
    },
    subContainer: {
        flexDirection: 'column',
        padding: 8
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
        borderColor: '#CCCCCC',
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