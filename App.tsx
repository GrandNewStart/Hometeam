import * as React from 'react'
import LoginScreen from './src/screens/login/LoginScreen'
import MainScreen from './src/screens/main/MainScreen'
import SignUpScreen from './src/screens/signup/SignUpScreen'
import RecoveryScreen from './src/screens/recovery/RecoveryScreen'
import TeamLoginScreen from './src/screens/teamLogin/TeamLogin'
import TeamRecoveryScreen from './src/screens/teamRecovery/TeamRecoveryScreen'
import NewTeamScreen from './src/screens/newTeam/NewTeamScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './src/store/redux/store'
import { SplashScreen } from './src/screens/splash/SplashScreen'
import { computeSharedSecret, createCSR, generateKeyPair } from './src/utils/CryptoUtils'

const Stack = createNativeStackNavigator()

export default function App() {
  // const kp1 = generateKeyPair()
  // const kp2 = generateKeyPair()
  // console.log(kp1)
  // console.log(kp2)
  // const sec1 = computeSharedSecret(kp1.privateKey, kp2.publicKey)
  // const sec2 = computeSharedSecret(kp2.privateKey, kp1.publicKey)
  // console.log(sec1)
  // console.log(sec2)
  // const csr = createCSR('hbjw123@naver.com', kp1)
  // console.log(csr)
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashScreen}/>
            <Stack.Screen name='Login' component={LoginScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name='Recovery' component={RecoveryScreen}/>
            <Stack.Screen name='TeamLogin' component={TeamLoginScreen}/>
            <Stack.Screen name='TeamRecovery' component={TeamRecoveryScreen}/>
            <Stack.Screen name='NewTeam' component={NewTeamScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='Main' component={MainScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}