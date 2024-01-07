import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"
import { useState } from "react"
import Colors from "../../assets/Colors"


function RecoveryScreen() {
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
        navigation.navigate('TeamLogin')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ActionBar onBackPress={onBackPress} title={'로그인'} trailingButtonEnabled={false}/>
            <View style={styles.subContainer}>
                <Text style={styles.messageText}>개인키 복구</Text>
                <TextInput style={styles.mnemonicInput} placeholder="12개의 백업 단어를 입력해주세요." textAlign="center" onChangeText={onChangeText} multiline={true}/>
                <CustomButton style={styles.button} isEnabled={recoverButtonEnabled} title={'로그인'} onPress={recoverPrivateKey}/>
                <CustomButton style={styles.button} isEnabled={true} title={'취소'} onPress={onBackPress}/>
            </View>
        </SafeAreaView>
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