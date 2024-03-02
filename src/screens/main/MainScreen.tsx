import { StyleSheet, SafeAreaView, ScrollView, View, BackHandler, Text } from "react-native"
import ActionBar from "./components/ActionBar"
import DateContainer from "./components/DateContainer"
import ProgressTracker from "./components/ProgressTracker"
import NewTaskContainer from "./components/NewTaskContainer"
import TaskContainer from "./components/TaskContainer"
import ProfileModal from "./components/ProfileModal"
import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'
import { getNextDateTime, getPreviousDateTime } from "../../utils/DateUtils"
import DateTimeProps from "../../types/DateTime"
import Colors from "../../assets/Colors"
import { LinearGradient } from "react-native-gradients"

const MainScreen = ({ navigation, route })=>{
    const { team } = route.params
    const [dateTime, setDateTime] = useState<DateTimeProps>({year: 2023, month: 11, date: 26, day: 'SUN'})
    const [profile, setProfile] = useState({ id: '철수ID', teamId: '영철팀ID', name: '철수', image: '', color: '#8EC5F9' })

    // BackHandler.addEventListener('hardwareBackPress', ()=>{
    //     console.log('back')
    //     if (isProfileModalVisible) {
    //         console.log('back back')
    //         setIsProfileModalVisible(false)
    //     }
    //     return true
    // })

    function profileClickHandler() {
        console.log(profile)
    }

    function changeDateBack() {
        setDateTime(getPreviousDateTime(dateTime))
    }

    function changeDateForward() {
        setDateTime(getNextDateTime(dateTime))
    }

    const gardientColors = [
        {offset: '80%', color: Colors.primaryBackground, opacity: '1'},
        {offset: '100%', color: Colors.secondaryBackground, opacity: '1'},
    ]
    const gardientColors2 = [
        {offset: '90%', color: Colors.secondaryBackground, opacity: '1'},
        {offset: '100%', color: Colors.primaryBackground, opacity: '1'},
    ]
    return (
        <>
            <SafeAreaView style={{backgroundColor: Colors.secondaryBackground}}/>
            <SafeAreaView style={{backgroundColor: Colors.secondaryBackground}}>
                <ScrollView>
                    <>
                        {/* <View style={{position: 'absolute', width: '100%', height: '100%'}}>
                            <LinearGradient colorList={gardientColors} angle={90} />
                        </View>   */}
                        <View style={styles.container}>
                            <ActionBar title={profile.name} onProfileClick={profileClickHandler}/>
                            <DateContainer dateTime={dateTime} onBack={changeDateBack} onForward={changeDateForward}/>
                            <ProgressTracker dateTime={dateTime}/>    
                            <View style={styles.taskContainer} >
                                <Text style={styles.teamName}>{team.name}</Text>
                                <NewTaskContainer dateTime={dateTime}/>
                                <TaskContainer dateTime={dateTime}/>
                                <LinearGradient colorList={gardientColors2} angle={90} />
                            </View>
                        </View>
                    </>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.clear
    },
    taskContainer: {
        backgroundColor: Colors.primaryBackground,
        paddingBottom: 128,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    teamName: {
        width: '100%',
        fontWeight: '800',
        fontSize: 32,
        color: Colors.primaryText,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 32,
    }
})


export default MainScreen