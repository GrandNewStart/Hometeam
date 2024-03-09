import * as React from 'react'
import LoginScreen from './src/screens/login/LoginScreen'
import MainScreen from './src/screens/main/MainScreen'
import SignUpScreen from './src/screens/signup/SignUpScreen'
import RecoveryScreen from './src/screens/recovery/RecoveryScreen'
import TeamRecoveryScreen from './src/screens/teamRecovery/TeamRecoveryScreen'
import NewTeamScreen from './src/screens/newTeam/NewTeamScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './src/store/redux/store'
import { SplashScreen } from './src/screens/splash/SplashScreen'
import { TeamScreen } from './src/screens/team/TeamScreen'
import * as Progress from 'react-native-progress'
import Colors from './src/assets/Colors'
import { Alert, Platform, View } from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

const Stack = createNativeStackNavigator()

async function requestUserPermission() {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('[App] requestUserPermission:', authStatus);
    }
  }
}

function ProgressBar() {
  const isLoading = useSelector((state)=>state.progressBar.isLoading)

  if (!isLoading) return null
  
  return <View style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.clear
  }}>
      <Progress.Circle 
        size={50} 
        indeterminate={true} 
        borderColor={Colors.primaryGreen}
        borderWidth={5}
        style={
          { 
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: Colors.blackHalfClear, 
          }
        }/>
  </View>
}

export default function App() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  requestUserPermission()

  React.useEffect(()=>{
    messaging().getToken().then(token => {
      console.log('token:', token)
    })
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Message:', JSON.stringify(remoteMessage))
    })
    return unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashScreen}/>
            <Stack.Screen name='Login' component={LoginScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name='Team' component={TeamScreen}/>
            <Stack.Screen name='Recovery' component={RecoveryScreen}/>
            <Stack.Screen name='TeamRecovery' component={TeamRecoveryScreen}/>
            <Stack.Screen name='NewTeam' component={NewTeamScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='Main' component={MainScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
        <ProgressBar/>  
      </GestureHandlerRootView>
    </Provider>
  )
}