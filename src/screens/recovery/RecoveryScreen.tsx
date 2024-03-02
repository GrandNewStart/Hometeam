import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import CustomButton from "../../components/CustomButton"
import { useState } from "react"
import Colors from "../../assets/Colors"

const extractSeed = (mnemonic:string)=>{
    /** EXTRACT SEED FROM MNEMONIC */
    return 'seed'
}

const extractKey = (seed:string)=>{
    /** EXTRACT KEY FROM SEED */
    return 'key'
}

const getPublicKey = (key:string)=>{
    /** EXTRACT PUBLIC KEY FROM KEY */
    return 'public-key'
}

function RecoveryScreen({ navigation }) {
    const [recoverButtonEnabled, setRecoverButtonEnabled] = useState(false)
    const [mnemonic, setMnemonic] = useState('')

    function onChangeText(text: string) {
        const words = text.split(' ')
        setRecoverButtonEnabled(words.length == 12)
        if (words.length > 12) {
            setMnemonic(mnemonic)
        } else {
            setMnemonic(text)
        }
    }

    function recoverPrivateKey() {
        try {
            const seed = extractSeed(mnemonic)
            console.log('[RecoveryScreen] recoverPrivateKey: seed =', seed)
            const key = extractKey(seed)
            console.log('[RecoveryScreen] recoverPrivateKey: key =', key)
            const publicKey = getPublicKey(key)
            console.log('[RecoveryScreen] recoverPrivateKey: publicKey =', publicKey)
            navigation.goBack()
            navigation.navigate('Team')
        } catch (err) {
            console.error('[RecoveryScreen] recoverPrivateKey:', err)
        }
    }

    return (
        <>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
            <SafeAreaView style={{flex:1, backgroundColor: Colors.primaryBackground}}>
                <ActionBar onBackPress={()=>{ navigation.goBack() }} title={'로그인'} trailingButtonEnabled={false}/>
                <KeyboardAvoidingView behavior={'position'} style={styles.container}>
                    <>
                        <Text style={styles.messageText}>개인키 복구</Text>
                        <TextInput 
                            style={styles.mnemonicInput} 
                            placeholder="12개의 백업 단어를 입력해주세요." 
                            value={mnemonic}
                            textAlign="center" 
                            onChangeText={onChangeText} 
                            multiline={true}
                            blurOnSubmit={true}
                            onSubmitEditing={Keyboard.dismiss}
                            returnKeyType={'done'}/>
                        <CustomButton 
                            style={styles.button} 
                            isEnabled={recoverButtonEnabled}
                            title={'로그인'} 
                            onPress={recoverPrivateKey}/>
                        <CustomButton 
                            style={styles.button} 
                            isEnabled={true} 
                            title={'취소'} 
                            onPress={()=>{ navigation.goBack() }}/>
                    </>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 32
    },
    messageText: {
        color: Colors.primaryText,
        fontWeight: '800',
        fontSize: 32,
        textAlign: 'center',
    },
    mnemonicInput: {
        borderWidth: 1,
        borderColor: Colors.primaryText,
        borderRadius: 5,
        height: '25%',
        marginTop: 16,
        padding: 16,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button: {
        height: 50,
        marginTop:8
    }
})

export default RecoveryScreen