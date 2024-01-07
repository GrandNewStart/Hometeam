import { StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, Dimensions } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import Colors from "../../assets/Colors"
import { Images } from "../../assets/Images"

const moveToMainScreen = (navigation)=>{
    navigation.navigate('Recovery')
}

const moveToSignUpScreen = (navigation)=>{
    navigation.navigate('SignUp')
}

const LoginScreen = ({navigation})=>{
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={styles.subContainer}>
                <Image style={styles.image} source={Images.appIcon}/>
                <Text style={styles.titleText}>Hometeam</Text>
                <CustomTextInput style={styles.textInput} title={'이메일'}/>
                <CustomTextInput style={styles.textInput} title={'비밀번호'}/>
                <CustomButton style={styles.button} title={'로그인'} isEnabled={true} onPress={()=>{moveToMainScreen(navigation)}}/>
                <CustomButton style={styles.button} title={'회원가입'} isEnabled={true} onPress={()=>{moveToSignUpScreen(navigation)}}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 32,
    },
    image: {
        width: SCREEN_WIDTH/2.5,
        height: SCREEN_WIDTH/2.5,
        alignSelf: 'center',
    },
    titleText: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.primaryText,
        textAlign: 'center',
    },
    textInput: {
        marginTop: 8,
    },
    button: {
        marginTop: 8,
        height: 50,
    }
})

export default LoginScreen