import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import CustomButton from "../../components/CustomButton"
import { useNavigation } from "@react-navigation/native"
import Colors from "../../assets/Colors"
import { Images } from "../../assets/Images"

const NAME = '김철수'

function TeamLoginScreen() {
    const navigation = useNavigation()

    function onBackPress() {
        navigation.goBack()
    }

    function onTeamLogin() {
        navigation.navigate('TeamRecovery')
    }

    function onNewTeam() {
        navigation.navigate('NewTeam')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ActionBar onBackPress={onBackPress} title={'팀 로그인'} trailingButtonEnabled={false}/>
            <View style={styles.subContainer}>
                <Text style={styles.welcomeText}>'{NAME}'님, 환영합니다</Text>
                <Image style={styles.logoImage} resizeMode='stretch' source={Images.appIcon}/>
                <Text style={styles.logoText}>Hometeam</Text>
                <CustomButton style={styles.button} isEnabled={true} title={'팀 로그인'} onPress={onTeamLogin}/>
                <CustomButton style={styles.button} isEnabled={true} title={'새로운 팀 생성하기'} onPress={onNewTeam}/>
            </View>
        </SafeAreaView>
    )
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 32
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: Colors.primaryText
    },
    logoImage: {
        width: SCREEN_WIDTH/2,
        height: SCREEN_WIDTH/2,
        alignSelf: 'center'
    },
    logoText: {
        color: Colors.primaryText,
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8
    },
    button: {
        height: 50,
        marginTop: 8
    }
})

export default TeamLoginScreen