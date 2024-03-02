import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const ActionBar = (props:any)=>{
    const { title, onProfileClick, style } = props
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onProfileClick}>
                <View style={styles.profileContainer}>
                    <Image 
                        style={styles.profileImage} 
                        source={require('../../../assets/images/person.png')}/>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.optionImage}
                    source={require('../../../assets/images/option.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 8
    },
    profileImage: {
        height: 40,
        width: 40,
        marginEnd: 8
    },
    text: {

    },
    optionImage: {
        height: 30,
        width: 30,
        marginEnd: 8
    }
})

export default ActionBar