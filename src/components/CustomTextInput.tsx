import { StyleSheet, Text, TextInput, View } from "react-native"
import Colors from "../assets/Colors"

const CustomTextInput = (props:any) => {
    const { style, title, text, keyboardType, onChange, message, isEnabled, placeholder, secureTextEntry } = props
    return (
        <View style={[styles.container, style]}>
            { title && <Text style={styles.titleText}>{title}</Text> }
            <TextInput 
                style={[styles.textInput, { color: (isEnabled ?? true) ? Colors.primaryText : Colors.tertiaryText}]} 
                placeholder={placeholder} 
                autoCorrect={false}
                autoCapitalize={'none'}
                secureTextEntry={secureTextEntry}
                value={text}
                onChangeText={onChange} 
                keyboardType={keyboardType}
                editable={isEnabled}/>
            { message && <Text style={[styles.messageText, message.style]}>{message.text}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    titleText: {
        color: Colors.primaryText,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        color: Colors.primaryText,
        borderRadius: 5,
        borderColor: Colors.primaryText,
        height: 50,
        padding: 8
    },
    messageText: {
        fontSize: 14,
        color: Colors.red
    }
})

export default CustomTextInput