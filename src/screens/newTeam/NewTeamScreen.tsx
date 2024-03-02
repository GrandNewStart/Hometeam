import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import ActionBar from "../../components/ActionBar"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"
import CustomTextInput from "../../components/CustomTextInput"
import { Images } from "../../assets/Images"
import Colors from "../../assets/Colors"
import { useEffect, useState } from "react"
import Team from "../../types/Team"
import Account from "../../types/Account"

import * as CertificateUtils from '../../utils/crypto/CertificateUtils'
import * as KeyUtils from '../../utils/crypto/KeyUtils'

const createTeam = async (props:any)=>{
    const { name, image, csr } = props
    /** POST /teams */
    console.log('POST /teams')
    return {
        id: 'team-id',
        name: name,
        image: image,
        certificate: 'team-certificate',
        accounts: [] as Account[]
    } as Team
}

const ImageContainer = ({ changeImage })=>{
    return (
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={Images.defaultTeam}/>
            <TouchableHighlight style={styles.editButton} underlayColor={Colors.secondaryGreen} onPress={changeImage}>
                <Image style={styles.editButtonImage} source={Images.pencil}/>
            </TouchableHighlight>
        </View>
    )
}

function NewTeamScreen() {
    const navigation = useNavigation()
    const [ image, setImage ] = useState('')
    const [ name, setName ] = useState('')
    const [ nextButtonEnabled, setNextButtonEnabled ] = useState(false)

    useEffect(()=>{
        setNextButtonEnabled(name !== '')
    }, [name])

    function changeImage() {
        console.log('changeImage')
    }

    function onTeamNameChage(text:string) {
        setName(text)
    }

    function createNewTeam() {
        // const keypair = KeyUtils.generateKeyPair()
        // const csr = CertificateUtils.createCSR('', keypair)
        // createTeam({name, image, csr})
        //     .then(team=>{
        //         console.log('[NewTeamScreen] createNewTeam: SUCCESS', team)
        //         navigation.navigate('Main', { team })
        //     })
        //     .catch(err=>{console.error('[NewTeamScreen] createNewTeam:' ,err)})
    }

    return (
        <>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
            <SafeAreaView style={{flex: 1}}>
                <ActionBar onBackPress={()=>{ navigation.goBack() }} title={'팀 생성'}/>
                <KeyboardAvoidingView behavior={'position'} style={styles.container}>
                    <View style={styles.subContainer}>
                        <ImageContainer changeImage={changeImage}/>
                        <CustomTextInput placeholder={'팀 이름'} onChange={onTeamNameChage}/>
                        <CustomButton 
                            style={styles.button} 
                            isEnabled={nextButtonEnabled} 
                            title={'새로운 팀 생성하기'} 
                            onPress={createNewTeam}/>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <SafeAreaView style={{backgroundColor: Colors.primaryBackground}}/>
        </>
    )
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
        justifyContent: 'center'
    },
    subContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 32,
        marginBottom: 50
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    imageContainer: {
        width: SCREEN_WIDTH/3,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 32,
    },
    image: {
        width: SCREEN_WIDTH/3,
        height: SCREEN_WIDTH/3,
        borderRadius: SCREEN_WIDTH/6,
        borderWidth: 5,
        borderColor: Colors.primaryGreen,
        alignSelf: 'center'
    },
    editButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primaryGreen,
        justifyContent: 'center',
        bottom: 24
    },
    editButtonImage: {
        width: '50%',
        height: '50%',
        tintColor: Colors.white,
        alignSelf: 'center',
    },
    logoText: {
        color: 'black',
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8
    },
    button: {
        height: 50,
        marginTop: 8
    }
})

export default NewTeamScreen