import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../../../components/CustomButton"
import { Images } from "../../../assets/Images"
import Clipboard from '@react-native-clipboard/clipboard'

function SignUpCompleteView({ signUpComplete, mnemonic }) {
    function copyToClipboard() {
        Clipboard.setString(mnemonic)
        Alert.alert('클립보드에 복사되었습니다')
    }
    return signUpComplete ?
        <View style={styles.signUpCompleteView}>
            <Image style={styles.logoImage} source={Images.appIcon}/>
            <Text style={styles.homeTeamText}>Hometeam</Text>
            <Text style={styles.mnemonicText}>{mnemonic}</Text>
            <Text style={styles.signUpCompleteText}>회원가입이 완료되었습니다.</Text>
            <Text style={styles.signUpCompleteText}>계정 복구에 필요한 위 단어들을</Text>
            <Text style={styles.signUpCompleteText}>반드시 백업해두세요.</Text>
            <CustomButton style={styles.button} isEnabled={true} title={'클립보드에 복사'} onPress={copyToClipboard}/>
        </View>
        : null
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    signUpCompleteView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    logoImage: {
        width: SCREEN_WIDTH/2,
        height: SCREEN_WIDTH/2,
        alignSelf: 'center'
    },
    homeTeamText: {
        color: 'black',
        fontWeight: '800',
        fontSize: 32,
        alignSelf: 'center'
    },
    mnemonicText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: 'gray',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 16,
        marginHorizontal: 32
    },
    signUpCompleteText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
        marginHorizontal: 32,
        textAlign: 'center',
    },
    button: {
        height: 50,
        marginTop: 16,
        marginHorizontal: 32
    }
})

export default SignUpCompleteView