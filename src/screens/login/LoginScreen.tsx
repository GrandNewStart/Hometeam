import { StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, Dimensions, Alert } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import Colors from "../../assets/Colors"
import { Images } from "../../assets/Images"
import { isValidEmail } from "../../utils/TextUtils"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { hideProgressBar, showProgressBar } from "../../store/redux/progressBar"

import * as LogInAPI from '../../api/LogInAPI'
import * as UserAPI from '../../api/UserAPI'
import * as KeychainUtils from '../../utils/KeychainUtils'
import * as HashUtils from '../../utils/crypto/HashUtils'
import * as ChaCha20Utils from '../../utils/crypto/ChaCha20Utils'
import * as KeyUtils from '../../utils/crypto/KeyUtils'
import * as JWTUtils from '../../utils/JWTUtils'
import { getAccount, setAccount } from "../../store/redux/account"
import KeyPair from "../../types/KeyPair"

const decryptKey = async (encKey:string, password:string)=>{
    const buffer = Buffer.from(encKey, 'hex')
    const nonce = buffer.slice(0, 12).toString('hex')
    const cipherText = buffer.slice(12).toString('hex')
    const hashedPassword = HashUtils.sha256(password)
    const plainText = ChaCha20Utils.decrypt(cipherText, hashedPassword, nonce)
    return plainText
}

const LoginScreen = ({navigation})=>{

    const [ email, setEmail ] = useState('')
    const [ encKey, setEncKey ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLoginEnabled, setIsLoginEnabled ] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        if (encKey === '') {
            setIsLoginEnabled(isValidEmail(email))
        } else {
            setIsLoginEnabled(password !== '')
        }
    }, [email, encKey, password])

    const moveToTeamScreen = ()=>{
        setEmail('')
        setEncKey('')
        setPassword('')
        navigation.navigate('Team')
    }

    const moveToSignUpScreen = ()=>{
        setEmail('')
        setEncKey('')
        setPassword('')
        navigation.navigate('SignUp')
    }

    const moveToRecoveryScreen = ()=>{
        setEmail('')
        setEncKey('')
        setPassword('')
        navigation.navigate('Recovery')
    }

    const onEmailInput = (text:string)=>{
        setEmail(text ?? '')
    }

    const onPasswordInput = (text:string)=>{
        setPassword(text ?? '')
    }

    const onLoginButtonPress = ()=>{
        if (encKey === '') {
            dispatch(showProgressBar())
            LogInAPI.getEncKey(email)
                .then(encKey=>{
                    console.log('[LoginScreen] onLoginButtonPress: GET /users/enc-key SUCCESS ', encKey)
                    setEncKey(encKey)
                    dispatch(hideProgressBar())
                })
                .catch(err=>{ 
                    console.log('[LoginScreen] onLoginButtonPress: GET /users/enc-key FAILURE', err)
                    Alert.alert('비밀번호를 등록하지 않았거나 가입되지 않은 이메일입니다.')
                    dispatch(hideProgressBar())
                 })
        } else {
            dispatch(showProgressBar())
            decryptKey(encKey, password)
                .then(onKeyRecovered)
                .catch(err=>{ 
                    console.error('[LoginScreen] onLoginButtonPress:', err) 
                    Alert.alert('회원정보 복호화에 실패하였습니다. 비밀번호를 확인해주세요.')
                    dispatch(hideProgressBar())
                })
        }
    }

    const onKeyRecovered = async (mnemonic:string) => {
        console.log('[LoginScreen] onKeyRecovered:', mnemonic)
        const keyPair = KeyUtils.generateKeyPair(mnemonic)
        
        let jwt: string
        try {
            jwt = await LogInAPI.login(keyPair)
        } catch (err) {
            console.error('[LoginScreen] onKeyRecovered 1:', err)
            Alert.alert('로그인 실패')
            dispatch(hideProgressBar())
            return
        }

        const payload = JWTUtils.getPayload(jwt)
        console.log(payload)
        const subject = JSON.parse(payload['sub'])
        const id = subject['id']
        if (!id) {
            Alert.alert('회원정보 조회 실패', 'cannot find `id`')
            dispatch(hideProgressBar())
            return
        }

        try {
            const userInfo = await UserAPI.getUserInfo(id)
            KeychainUtils.setMnemonic(mnemonic)
            dispatch(setAccount({
                keyPair,
                userInfo: {
                    id: id,
                    name: userInfo.name,
                    email: userInfo.email,
                    image: '',
                    accessToken: jwt,
                    certificate: ''
                }
            }))
            Alert.alert('회원 복구 성공')
            dispatch(hideProgressBar())
        } catch (err) {
            console.error('[LoginScreen] onKeyRecovered 2:', err)
            Alert.alert('회원정보 조회 실패', `${err}`)
            dispatch(hideProgressBar())
            return
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={'position'} style={styles.subContainer}>
                <Image style={styles.image} source={Images.appIcon}/>
                <Text style={styles.titleText}>Hometeam</Text>
                <CustomTextInput 
                    style={styles.textInput} 
                    title={'이메일'} 
                    text={email}
                    onChange={onEmailInput}
                    isEnabled={encKey === ''}/>
                {
                    encKey === '' ? 
                    null : 
                    <CustomTextInput 
                        style={styles.textInput} 
                        title={'비밀번호'} 
                        text={password}
                        secureTextEntry={true}
                        onChange={onPasswordInput}/>
                }
                <CustomButton 
                    style={styles.button} 
                    title={'로그인'} 
                    isEnabled={isLoginEnabled} 
                    onPress={onLoginButtonPress}/>
                <CustomButton 
                    style={styles.button} 
                    title={'계정 복원'} 
                    isEnabled={true}
                    onPress={moveToRecoveryScreen}/>
                <CustomButton 
                    style={styles.button} 
                    title={'회원가입'} 
                    isEnabled={true} 
                    onPress={moveToSignUpScreen}/>
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
