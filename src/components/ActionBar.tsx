import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../assets/Colors";

function ActionBar(props: any) {
    const { title, onBackPress, onTrailingButtonPress, trailingButtonEnabled, trailingButtonStyle } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                <Image style={styles.backButton} source={require('../assets/images/left.png')}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
            {
                    <TouchableOpacity style={{width: 32, marginEnd: 8}} onPress={onTrailingButtonPress}>
                        {
                            trailingButtonEnabled ? 
                                <Image style={[styles.trailingButton, trailingButtonStyle]} source={require('../assets/images/option.png')}/> 
                                : null
                        }
                    </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: Colors.primaryBackground,
        // borderBottomColor: Colors.secondaryText,
        // borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        width: 32,
        height: 24,
        marginStart: 8,
        tintColor: Colors.secondaryText,
    },
    titleText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.secondaryText,
    },
    trailingButton: {
        width: 32,
        height: 24,
    }
})

export default ActionBar