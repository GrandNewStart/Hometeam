import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Alert, View, Platform, Keyboard } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import { useEffect, useState } from "react"
import Colors from "../../assets/Colors"
import { isValidEmail, isValidPassword } from "../../utils/TextUtils"
import ActionBar from "../../components/ActionBar"
import SignUpCompleteView from "./components/CompleteView"
import * as LogInAPI from "../../api/LogInAPI"
import { useDispatch } from "react-redux"
import { hideProgressBar, showProgressBar } from "../../store/redux/progressBar"

import * as Storage from '../../storage/Storage'
import * as KeychainUtils from '../../utils/KeychainUtils'
import * as KeyUtils from '../../utils/crypto/KeyUtils'
import * as CertificateUtils from '../../utils/crypto/CertificateUtils'
import * as ChaCha20Utils from '../../utils/crypto/ChaCha20Utils'
import * as HashUtils from '../../utils/crypto/HashUtils'
import UserInfoProp from "../../types/UserInfoProp"

interface ErrorMessage {
    text: string,
    style: any
}

const SignUpScreen = ({navigation})=>{

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState('')    
    const [authCode, setAuthCode] = useState('')
    const [name, setName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [mnemonic, setMnemonic] = useState<string|null>(null)

    const [emailInputMessage, setEmailInputMessage] = useState<ErrorMessage|null>(null)
    const [authCodeInputMessage, setAuthCodeInputMessage] = useState<ErrorMessage|null>(null)
    const [nameInputError, setNameInputError] = useState<ErrorMessage|null>(null)
    const [password1InputError, setPassword1InputError] = useState<ErrorMessage|null>(null)
    const [password2InputError, setPassword2InputError] = useState<ErrorMessage|null>(null)

    const [emailInputEnabled, setEmailInputEnabled] = useState(true)

    const [emailComplete, setEmailComplete] = useState(false)
    const [authCodeSent, setAuthCodeSent] = useState(false)
    const [signUpComplete, setSignUpComplete] = useState(false)
    
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false)
    const [nextButtonText, setNextButtonText] = useState('인증코드 발송')

    useEffect(()=>{
        dispatch(isLoading ? showProgressBar() : hideProgressBar())
    }, [isLoading])

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

    function onSignUpSuccess(response: any, mnemonic: string) {
        const { id, email, name, cert } = response
        setMnemonic(mnemonic)
        KeychainUtils.setMnemonic(mnemonic)
        const userInfo: UserInfoProp = { id: `${id}`, email: email, name: name, image: '', accessToken: '', certificate: cert }
        Storage.setUserInfo(userInfo)
    }

    function onNextButtonClick() {
        /** 아직 인증코드를 요청하지 않음 + 이메일 인증 완료 안함 */
        if (!authCodeSent && !emailComplete) {    
            setIsLoading(true)
            Keyboard.dismiss()
            LogInAPI.requestAuthCode(email)
                .then(()=>{ setAuthCodeSent(true) })
                .catch((err)=>{ console.error('[SignUpScreen] onNextButtonClick-1:', err) })
                .finally(()=>{ setIsLoading(false) })
            return
        }
        /** 인증코드를 요청함 + 이메일 인증 완료 안함 */
        if (authCodeSent && !emailComplete) {
            setIsLoading(true)
            Keyboard.dismiss()
            LogInAPI.verifyAuthCode(email, authCode)
                .then(()=>{ setEmailComplete(true) })
                .catch((err)=>{ console.error('[SignUpScreen] onNextButtonClick-2:', err) })
                .finally(()=>{ setIsLoading(false) })
            return
        }
        /** 입력값 체크하고 회원가입 */
        let nameIsEmpty = (name === '')
        let passwordInvalid = !isValidPassword(password1)
        let passwordNoMatch = (password1 !== password2)

        setNameInputError(nameIsEmpty ? { text: '닉네임을 입력하세요', style: { color: Colors.red } }: null)
        setPassword1InputError(passwordInvalid ? { text: '비밀번호는 8자 이상의 알파벳과 숫자 조합입니다.', style: { color: Colors.red } } : null)
        setPassword2InputError(passwordNoMatch ? { text: '비밀번호가 일치하지 않습니다.', style: { color: Colors.red } } : null)
        
        if (nameIsEmpty || passwordInvalid || passwordNoMatch) return

        if (!signUpComplete) {
            setIsLoading(true)
            
            Keyboard.dismiss()
            const mnemonic = KeyUtils.generateMnemonic()
            console.log('[SignUpScreen] onNextButtonClick: mnemonic =', mnemonic)

            const keyPair = KeyUtils.generateKeyPair(mnemonic)
            console.log('[SignUpScreen] onNextButtonClick: keypair =', keyPair)

            const hashedPassword = HashUtils.sha256(password1)
            console.log('[SignUpScreen] onNextButtonClick: hashedPassword =', hashedPassword)

            const nonce = KeyUtils.getRandomBytes(12)
            console.log('[SignUpScreen] onNextButtonClick: nonce =', nonce)

            const encKey = nonce + ChaCha20Utils.encrypt(mnemonic, hashedPassword, nonce)
            console.log('[SignUpScreen] onNextButtonClick: encKey =', encKey)

            const csr = CertificateUtils.createCSR(email, keyPair)
            console.log('[SignUpScreen] onNextButtonClick: csr =', csr)

            LogInAPI.join(authCode, email, name, encKey!, csr)
                .then((rsp)=>{
                    console.log(rsp)
                    setSignUpComplete(true)
                    onSignUpSuccess(rsp, mnemonic)
                })
                .catch((err)=>{ 
                    console.error('[SignUpScreen] onNextButtonClick-4:', err) 
                    Alert.prompt(err)
                })
                .finally(()=>{ setIsLoading(false) })
            return
        }

        /** 회원가입 완료 */
        if (signUpComplete) {
            Alert.alert(
                '단어를 저장하셨나요?', 
                '단어를 잃어버리면 다시 로그인 할 때 계정을 복구할 수 없습니다.', 
                [
                    { 
                        text: '예', 
                        onPress: ()=>{
                            navigation.goBack()
                            navigation.navigate('Team')
                        } 
                    }, 
                    { text: '아니오' }
                ], 
                {}
            )
        }
    }

    function EmailInput() {
        return signUpComplete ? null :
            <CustomTextInput 
                style={styles.textInput} 
                isEnabled={emailInputEnabled}
                title={'이메일'} 
                keyboardType={'email-address'}
                onChange={onEmailChange} 
                message={emailInputMessage}/>
    }

    function AuthCodeInput() {
        return !signUpComplete && authCodeSent && !emailComplete ? 
            <CustomTextInput 
                style={styles.textInput} 
                title={'인증번호'} 
                keyboardType={'phone-pad'}
                isEnabled={!isLoading}
                onChange={onAuthCodeChange} 
                message={authCodeInputMessage}/> 
            : null
    }

    function NameInput() {
        return !signUpComplete && emailComplete ? 
            <CustomTextInput 
                style={styles.textInput} 
                title={'닉네임'} 
                isEnabled={!isLoading}
                onChange={onNameChange} 
                message={nameInputError}/> 
        : null
    }

    function PasswordInput() {
        return !signUpComplete && emailComplete ?
            <>
                <CustomTextInput 
                    style={styles.textInput} 
                    title={'비밀번호'} 
                    secureTextEntry={true}
                    onChange={onPassword1Change} 
                    message={password1InputError}/>
                <CustomTextInput 
                    style={styles.textInput} 
                    title={'비밀번호 확인'} 
                    secureTextEntry={true}
                    isEnabled={!isLoading}
                    onChange={onPassword2Change} 
                    message={password2InputError}/>
            </> 
            : null
    }

    return (
        <>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <ActionBar title={'회원가입'} onBackPress={()=>{navigation.goBack()}} trailingButtonEnabled={false}/>
                    <KeyboardAvoidingView behavior={'position'} style={styles.subContainer}>
                        { EmailInput() }
                        { AuthCodeInput() }
                        { NameInput() }
                        { PasswordInput() }
                        { SignUpCompleteView({signUpComplete, mnemonic: mnemonic}) }
                        <CustomButton 
                            style={styles.button} 
                            title={nextButtonText} 
                            isEnabled={nextButtonEnabled && !isLoading} 
                            onPress={onNextButtonClick}/>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
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