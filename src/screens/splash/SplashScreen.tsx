import { Dimensions, Image, SafeAreaView, StyleSheet, View } from "react-native"
import Colors from "../../assets/Colors"
import { Images } from "../../assets/Images"
import { useEffect } from "react"
import { getPrivateKey } from "../../utils/KeychainUtils"

const SCREEN_WIDTH = Dimensions.get('window').width

export const SplashScreen = ({ navigation })=>{
    useEffect(()=>{
        setTimeout(initialize, 1500)
    }, [])

    function initialize() {
        getPrivateKey()
            .then(key=>{
                
            })
            .catch(e=>{
                navigation.navigate('Login')
            })
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