import { Pressable, StyleSheet, View, Text, Button } from "react-native"
import Colors from "../assets/Colors"

const CustomButton = (props:any)=>{
    const { style, title, isEnabled, highlightColor, onPress } = props
    return(
        <View style={[styles.outerContainer, isEnabled ? styles.enabled : styles.disabled, style]}>
            <Pressable 
                style={({pressed})=>
                        pressed && isEnabled 
                        ? [styles.innerContainer, styles.pressed] 
                        : styles.innerContainer
                    }
                onPress={isEnabled ? onPress : null}
                android_ripple={{ color: isEnabled ? (highlightColor ?? Colors.darkGreen) : null }}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    enabled: {
        backgroundColor: Colors.primaryGreen
    },
    disabled: {
        backgroundColor: 'gray'
    },
    pressed: {
        opacity: 0.75
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '900',
        flex: 1,
        padding:8
    }
})

export default CustomButton