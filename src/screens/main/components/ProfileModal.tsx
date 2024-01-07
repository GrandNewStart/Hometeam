import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomButton from "../../../components/CustomButton"
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from "react";

const ProfileModal = ({profile, ref})=>{
    const snapPoints = useMemo(() => ['20%', '100%'], []);
    return (
        <BottomSheet ref={ref} snapPoints={snapPoints}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.profileContainer}>
                        <Image style={styles.profileImage} source={profile.image}/>
                        <Text style={styles.profileText}>{profile.name}</Text>
                    </View>
                </TouchableOpacity>
                <CustomButton style={styles.button} highlightColor='gray' title={'사진 변경'} onPress={()=>{}}/>
                <CustomButton style={styles.button} highlightColor='gray' title={'이름 변경'} onPress={()=>{}}/>
                <CustomButton style={styles.button} highlightColor='gray' title={'로그아웃'} onPress={()=>{}}/>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 8
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 50,
        height: 50
    },
    profileText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginStart: 8
    },
    button: {
        height: 50,
        marginTop: 8,
        backgroundColor: 'black'
    }
})

export default ProfileModal