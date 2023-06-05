import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import MainPage from './src/screens/Main'
import Loading from './src/screens/Loading'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import StackTab from './src/screens/StackTab'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import ocrOutput from './src/OCR/output.json'

const Stack = createNativeStackNavigator()
const { width } = Dimensions.get('window')
const numOfCom = 4
// export const ocrDataLength = JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n').length)

export default function App() {
  const [isLoading, setIsLoading] = useState(true) //true면 로딩창, false면 메인창이 뜬다.
  const children = [<Loading />, <MainPage />]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='StackTab' component={StackTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  contentContainerStyle: { width: width * numOfCom },
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
})
