import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const DateContainer = ({dateTime, onBack, onForward}) => {
    const days = {
        SUN: '일요일', 
        MON: '월요일', 
        TUE: '화요일', 
        WED: '수요일', 
        THR: '목요일', 
        FRI: '금요일', 
        SAT: '토요일'
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Image style={styles.button} source={require('../../../assets/images/left.png')}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.textSmall}>{dateTime.year + '년'}</Text>
                <Text style={styles.textBig}>{dateTime.month + '월' + dateTime.date +'일'}</Text>
                <Text style={styles.textMid}>{days[dateTime.day]}</Text>
            </View>
            <TouchableOpacity onPress={onForward}>
                <Image style={styles.button} source={require('../../../assets/images/right.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginTop: 32
    },
    button: {
        width: 40,
        height: 40,
    },
    textContainer: {
        flexDirection: 'column',
        width: '70%',
    },
    textBig: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: '800'
    },
    textMid: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '600'
    },
    textSmall: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600'
    }
})

export default DateContainer