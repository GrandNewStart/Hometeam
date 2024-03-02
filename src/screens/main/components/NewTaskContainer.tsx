import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import DayProps from "../../../types/Day"
import { useSelector } from 'react-redux'
import TaskProps from "../../../types/Task"
import Colors from "../../../assets/Colors"

const Task = ({task}) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{task.name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Image style={styles.button} source={require('../../../assets/images/check.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.button} source={require('../../../assets/images/cancel.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const NewTaskContainer = ({dateTime}) => {
    const day: DayProps = useSelector((state)=>
        state.days.list.find( day =>
            {
                return day.dateTime.year === dateTime.year && 
                day.dateTime.month === dateTime.month && 
                day.dateTime.date === dateTime.date
            }
        )
    )
    const newTasks: TaskProps[] = day ? day.tasks.filter(task => task.status === 'new') : []
    if (newTasks.length == 0) return null
    return (
        <View style={styles.container}>
            <Text style={styles.title}>새로운 작업</Text>
                { newTasks.map(e => <Task key={e.id} task={e}/>) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
    },
    taskContainer: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.secondaryText,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 4,
        height: 50
    },
    taskText: {
        color: Colors.secondaryText,
        fontSize: 18,
        fontWeight: '600'
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        width: 32,
        height: 32,
        marginStart: 8
    }
})

export default NewTaskContainer