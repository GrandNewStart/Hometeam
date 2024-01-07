import { StyleSheet, SafeAreaView, ScrollView, View, BackHandler } from "react-native"
import ActionBar from "./components/ActionBar"
import DateContainer from "./components/DateContainer"
import ProgressTracker from "./components/ProgressTracker"
import NewTaskContainer from "./components/NewTaskContainer"
import TaskContainer from "./components/TaskContainer"
import ProfileModal from "./components/ProfileModal"
import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'
import { getNextDateTime, getPreviousDateTime } from "../../utils/DateUtils"

const Separator = () => {
    return <View style={{height: 2, backgroundColor: '#CCCCCC', margin: 8}}/>
}

const MainScreen = ()=>{
    const [dateTime, setDateTime] = useState({year: 2023, month: 11, date: 26, day: 'SUN'})
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

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <ScrollView>
                <View style={styles.container}>
                    <ActionBar style={styles.actionBar} title={profile.name} onProfileClick={profileClickHandler}/>
                    <DateContainer dateTime={dateTime} onBack={changeDateBack} onForward={changeDateForward}/>
                    <ProgressTracker dateTime={dateTime}/>    
                    <Separator />
                    <NewTaskContainer dateTime={dateTime}/>
                    <TaskContainer dateTime={dateTime}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 64
    },
    actionBar: {
        marginTop: 25
    },
})


export default MainScreen