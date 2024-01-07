import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"
import CustomTextInput from "../../components/CustomTextInput"
import { Images } from "../../assets/Images"
import Colors from "../../assets/Colors"

function NewTeamScreen() {
    const navigation = useNavigation()
    function onBackPress() {
        navigation.goBack()
    }
    function createNewTeam() {
        Alert.alert(
            '단어를 저장하셨나요?', 
            '단어를 잃어버리면 다시 로그인 할 때 팀을 복구할 수 없습니다.', 
            [
                { 
                    text: '예', 
                    onPress: ()=>{
                        navigation.goBack()
                        navigation.goBack()
                        navigation.navigate('Main')
                    } 
                }, 
                { text: '아니오' }
            ], 
            {}
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ActionBar onBackPress={onBackPress} title={'팀 생성'}/>
            <View style={styles.subContainer}>
                <Image style={styles.logoImage} resizeMode='stretch' source={Images.appIcon}/>
                <Text style={styles.logoText}>Hometeam</Text>
                <CustomTextInput placeholder={'팀 이름'}/>
                <CustomButton style={styles.button} isEnabled={true} title={'새로운 팀 생성하기'} onPress={createNewTeam}/>
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
        fontWeight: '600'
    },
    logoImage: {
        width: SCREEN_WIDTH/2,
        height: SCREEN_WIDTH/2,
        alignSelf: 'center'
    },
    logoText: {
        color: 'black',
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

export default NewTeamScreen