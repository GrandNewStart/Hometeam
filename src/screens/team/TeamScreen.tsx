import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import Colors from "../../assets/Colors"
import ActionBar from "../../components/ActionBar"
import { useEffect, useState } from "react"
import Team from "../../types/Team"
import Account from "../../types/Account"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Images } from "../../assets/Images"
import CustomButton from "../../components/CustomButton"

const getTeams = async ()=>{
    /** GET TEAMS */
    return [
        { id: '1', name: 'Team A', image: '', certificate: '', accounts: [] as Account[] } as Team,
        { id: '2', name: 'Team B', image: '', certificate: '', accounts: [] as Account[] } as Team,
        { id: '3', name: 'Team C', image: '', certificate: '', accounts: [] as Account[] } as Team,
        { id: '4', name: 'Team D', image: '', certificate: '', accounts: [] as Account[] } as Team,
        { id: '5', name: 'Team E', image: '', certificate: '', accounts: [] as Account[] } as Team
    ]
}

const renderTeam = (team:Team, navigation)=>{
    return (
        <TouchableOpacity onPress={()=>{ navigation.navigate('Main', { team }) }}>
            <View style={styles.teamItem}>
                <Image style={styles.teamImage} source={Images.defaultTeam}/>
                <Text style={styles.teamText}>{team.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const TeamScreen = ({ navigation })=>{
    const [ teams, setTeams ] = useState<Team[]>([])

    useEffect(()=>{
        getTeams()
            .then(teams=>{ setTeams(teams) })
            .catch(err=>{ console.error(err)} )
    },[])

    return (
        <>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <ActionBar title={'팀 선택'} onBackPress={()=>{navigation.goBack()}}/>
                    <FlatList
                        style={styles.flatList}
                        data={teams}
                        keyExtractor={e=>e.id}
                        renderItem={e=>renderTeam(e.item, navigation)}/>
                    <CustomButton 
                        style={styles.button}
                        title={'팀 생성'} 
                        isEnabled={true}
                        onPress={()=>{ navigation.navigate('NewTeam') }}/>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.primaryBackground
    },
    flatList: {
        margin: 16
    },
    teamItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    teamImage: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    teamText: {
        marginStart: 16,
        fontSize: 18,
        fontWeight: '800',
        color: Colors.primaryText
    },
    button: {
        height: 50,
        marginBottom: 32,
        marginHorizontal: 16
    }
})