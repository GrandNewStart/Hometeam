import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native-gesture-handler"
import CustomButton from "../../components/CustomButton"
import { useState } from "react"
import Colors from "../../assets/Colors"

function TeamRecoveryScreen() {
    const navigation = useNavigation()
    const [recoverButtonEnabled, setRecoverButtonEnabled] = useState(false)
    const [mnemonic, setMnemonic] = useState('')

    function onBackPress() {
        navigation.goBack()
    }

    function onChangeText(text: string) {
        setRecoverButtonEnabled(text.split(' ').length == 12)
        setMnemonic(text)
    }

    function recoverPrivateKey() {
        navigation.goBack()
        navigation.goBack()
        navigation.navigate('Main')
    }

    function recoverWithQRCode() {

    }

     return (
        <SafeAreaView style={styles.container}>
            <ActionBar onBackPress={onBackPress} title={'팀 로그인'}/>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={styles.subContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.messageText}>팀 키 복구</Text>
                    <TextInput 
                        style={styles.mnemonicInput} 
                        placeholder="12개의 백업 단어를 입력해주세요." 
                        textAlign="center" 
                        onChangeText={onChangeText} 
                        blurOnSubmit={true}
                        onSubmitEditing={Keyboard.dismiss}
                        returnKeyType={'done'}
                        multiline={true}
                    />
                    <CustomButton style={styles.button} isEnabled={recoverButtonEnabled} title={'로그인'} onPress={recoverPrivateKey}/>
                    <Text style={styles.orText}>또는</Text>
                    <CustomButton style={styles.button} isEnabled={true} title={'QR 코드로 로그인'} onPress={recoverWithQRCode}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
     )
}

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
    messageText: {
        color: 'black',
        fontWeight: '800',
        fontSize: 32,
        textAlign: 'center',
    },
    mnemonicInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        height: '25%',
        marginTop: 16,
        padding: 16
    },
    button: {
        height: 50,
        marginTop:8
    },
    orText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 8
    }
})

export default TeamRecoveryScreen