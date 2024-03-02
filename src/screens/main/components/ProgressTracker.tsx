import { StyleSheet, Text, View } from "react-native"
import { useSelector } from 'react-redux'
import MemberProps from "../../../types/Member"
import TaskProps from "../../../types/Task"
import Colors from "../../../assets/Colors"

function Member({member}) {
    return (
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: member.color }}/>
            <Text style={{fontSize: 14, color: 'black', marginHorizontal: 4}}>{member.name}</Text>
        </View>
    )
}

function Progress({tasks, members, member}) {
    let totalCount = 0
    let totalDoneCount = 0
    tasks.filter(task=>task.status !== 'new')
        .forEach((task: { memberIds: any[]; status: string })=>{
            if (task.memberIds.some(e=> e===member.id)) {
                totalCount += 1
                if (task.status === 'done') {
                    totalDoneCount += 1
                }
            }
        })
    const memberProgress = totalDoneCount / totalCount / members.length * 100
    return <View style={{width: `${memberProgress}%`, backgroundColor: member.color}}/>
}

const ProgressTracker = ({ dateTime }) => {
    const members: MemberProps[] = useSelector((state)=>state.members.list)
    const tasks: TaskProps[] = useSelector((state)=> {
            const day = state.days.list.find(e=>
                e.dateTime.year == dateTime.year &&
                e.dateTime.month == dateTime.month &&
                e.dateTime.date == dateTime.date
            )
            return day ? day.tasks : []
        }
    )
    return (
        <View style={styles.container}>
            <View style={styles.legendContainer}>
                { members.map(e => <Member key={e.id} member={e}/>) }
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                    { members.map(e => <Progress key={e.id} tasks={tasks} members={members} member={e}/>) }
                </View>
            </View>
        </View>
    )
    return null
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        padding: 8
    },
    legendContainer: {
        flexDirection: 'row'
    },
    progressContainer: {
        paddingVertical: 8,
        height: 64
    },
    progressBackground: {
        backgroundColor: Colors.clear,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.secondaryText,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
})

export default ProgressTracker