import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Alert, View } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import { useEffect, useState } from "react"
import Colors from "../../assets/Colors"
import { isValidEmail, isValidPassword } from "../../utils/TextUtils"
import ActionBar from "../../components/ActionBar"
import SignUpCompleteView from "./components/CompleteView"

const moveToMainScreen = (navigation)=>{
    navigation.popToTop()
    navigation.navigate('Main')
}

const cancel = (navigation)=>{
    navigation.goBack()
}

const SignUpScreen = ({navigation})=>{

    const [email, setEmail] = useState('')    
    const [authCode, setAuthCode] = useState('')
    const [name, setName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [emailInputMessage, setEmailInputMessage] = useState(null)
    const [authCodeInputMessage, setAuthCodeInputMessage] = useState(null)
    const [nameInputMessage, setNameInputMessage] = useState(null)
    const [password1InputMessage, setPassword1InputMessage] = useState(null)
    const [password2InputMessage, setPassword2InputMessage] = useState(null)

    const [emailInputEnabled, setEmailInputEnabled] = useState(true)

    const [emailComplete, setEmailComplete] = useState(false)
    const [authCodeSent, setAuthCodeSent] = useState(false)
    const [signUpComplete, setSignUpComplete] = useState(false)
    
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false)
    const [nextButtonText, setNextButtonText] = useState('인증코드 발송')

    function onEmailChange(text: string) {
        setEmail(text)
        setNextButtonEnabled(isValidEmail(text))
    }

    function onAuthCodeChange(text: string) {
        setAuthCode(text)
    }

    function onNameChange(text: string) {
        setName(text)
    }

    function onPassword1Change(text: string) {
        setPassword1(text)
    }

    function onPassword2Change(text: string) {
        setPassword2(text)
    }

    function onNextButtonClick() {
        if (!authCodeSent && !emailComplete) {
            setAuthCodeSent(true)
            return
        }
        if (authCodeSent && !emailComplete) {
            setEmailComplete(true)
            return
        }
        let ready = true
        if (name === '') {
            ready = false
            setNameInputMessage({ text: '닉네임을 입력하세요', style: { color: Colors.red } })
        } else {
            setNameInputMessage(null)
        }
        if (!isValidPassword(password1)) {
            ready = false
            setPassword1InputMessage({ text: '비밀번호는 8자 이상의 알파벳과 숫자 조합입니다.', style: { color: Colors.red } })
        } else {
            setPassword1InputMessage(null)
        }
        if (password1 !== password2) {
            ready = false
            setPassword2InputMessage({ text: '비밀번호가 일치하지 않습니다.', style: { color: Colors.red } })
        } else {
            setPassword2InputMessage(null)
        }
        if (ready && !signUpComplete) {
            setSignUpComplete(true)
            return
        }
        if (signUpComplete) {
            Alert.alert(
                '단어를 저장하셨나요?', 
                '단어를 잃어버리면 다시 로그인 할 때 계정을 복구할 수 없습니다.', 
                [
                    { 
                        text: '예', 
                        onPress: ()=>{
                            navigation.goBack()
                            navigation.navigate('TeamLogin')
                        } 
                    }, 
                    { text: '아니오' }
                ], 
                {}
            )
        }
    }

    useEffect(()=>{
        if (!authCodeSent) {
            setNextButtonEnabled(false)
            setNextButtonText('인증코드 발송')
            setEmailInputEnabled(true)
            return
        }
        if (authCodeSent && !emailComplete) {
            setNextButtonEnabled(authCode.length === 6)
            setNextButtonText('확인')
            setEmailInputEnabled(false)
            return
        }
        if (!signUpComplete) {
            setEmailInputEnabled(false)
            setNextButtonText('가입')
            return
        }
        setNextButtonText('다음')
    }, [authCodeSent, authCode, emailComplete, signUpComplete])

    function EmailInput() {
        return signUpComplete ? null :
            <CustomTextInput 
                style={styles.textInput} 
                isEnabled={emailInputEnabled}
                title={'이메일'} 
                onChange={onEmailChange} 
                message={emailInputMessage}/>
    }

    function AuthCodeInput() {
        return !signUpComplete && authCodeSent && !emailComplete ? 
            <CustomTextInput 
                style={styles.textInput} 
                title={'인증번호'} 
                onChange={onAuthCodeChange} 
                message={authCodeInputMessage}/> 
            : null
    }

    function NameInput() {
        return !signUpComplete && emailComplete ? 
            <CustomTextInput 
                style={styles.textInput} 
                title={'닉네임'} 
                onChange={onNameChange} 
                message={nameInputMessage}/> 
        : null
    }

    function PasswordInput() {
        return !signUpComplete && emailComplete ?
            <>
                <CustomTextInput 
                    style={styles.textInput} 
                    title={'비밀번호'} 
                    onChange={onPassword1Change} 
                    message={password1InputMessage}/>
                <CustomTextInput 
                    style={styles.textInput} 
                    title={'비밀번호 확인'} 
                    onChange={onPassword2Change} 
                    message={password2InputMessage}/>
            </> 
            : null
    }

    return (
        <SafeAreaView style={styles.container}>
            <>
                <ActionBar title={'회원가입'} onBackPress={()=>{cancel(navigation)}} trailingButtonEnabled={false}/>
                <KeyboardAvoidingView style={styles.subContainer}>
                    { EmailInput() }
                    { AuthCodeInput() }
                    { NameInput() }
                    { PasswordInput() }
                    { SignUpCompleteView({signUpComplete, mnemonic: 'card confirm tongue chief decorate crawl giggle twenty bean odor wepon cheif'}) }
                    <CustomButton 
                        style={styles.button} 
                        title={nextButtonText} 
                        isEnabled={nextButtonEnabled} 
                        onPress={onNextButtonClick}/>
                </KeyboardAvoidingView>
            </>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
        flexDirection: 'column'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    titleText: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.primaryText,
        textAlign: 'center',
    },
    textInput: {
        marginHorizontal: 32,
        marginVertical: 8,
        alignSelf: 'stretch'
    },
    button: {
        marginHorizontal: 32,
        marginTop: 8,
        height: 50,
    }
})

export default SignUpScreen