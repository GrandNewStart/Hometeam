import { Dimensions, Image, SafeAreaView, StyleSheet, View } from "react-native"
import Colors from "../../assets/Colors"
import { Images } from "../../assets/Images"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAccount } from "../../store/redux/account"

import * as KeychainUtils from '../../utils/KeychainUtils'
import * as SignatureUtils from '../../utils/crypto/SignatureUtils'
import * as ChaCha20Utils from '../../utils/crypto/ChaCha20Utils'
import * as KeyUtils from '../../utils/crypto/KeyUtils'
import * as HashUtils from '../../utils/crypto/HashUtils'
import * as Storage from '../../storage/Storage'
import * as LogInUtils from '../../api/LogInAPI'

const SCREEN_WIDTH = Dimensions.get('window').width

export const SplashScreen = ({ navigation })=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        setTimeout(initialize, 1500)
    }, [])

    async function initialize() {
        try {
            const mnemonic = await KeychainUtils.getMnemonic()
            console.log('[SplashScreen] initialize: ACCOUNT KEY =', mnemonic)

            const keyPair = KeyUtils.generateKeyPair(mnemonic)
            console.log('[SplashScreen] initialize: KEY PAIR =', keyPair)
            
            const userInfo = await Storage.getUserInfo()
            console.log('[SplashScreen] initialize: USER INFO =', userInfo)

            const token = await LogInUtils.login(keyPair)
            console.log('[SplashScreen] initialize: ACCESS TOKEN =', token)

            console.log({ ...userInfo, accessToken: token})
            dispatch(setAccount({ keyPair: keyPair, userInfo: { ...userInfo, accessToken: token } }))
            // TODO: Get Team Information
        } catch(err) {
            console.log('[SplashScreen] initialize:', err)
            navigation.navigate('Login')
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={Images.appIcon}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackground,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SCREEN_WIDTH/3,
        height: SCREEN_WIDTH/3
    }
})