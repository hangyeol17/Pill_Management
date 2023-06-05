import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions, SafeAreaView, StyleSheet, ActivityIndicator, Button, View, PermissionsAndroid } from 'react-native'
import MainPage from './src/screens/Main'
import Calendar from './src/screens/Calendar'
import Setting from './src/screens/Setting'
import Loading from './src/screens/Loading'
import Login from './src/screens/Login'
import Join from './src/screens/Join'
import InputInfo from './src/screens/InputInfo'
import AddPill from './src/screens/AddPill'
import StackTab from './src/screens/StackTab'
import 'react-native-gesture-handler'

//푸시 알람

const { width } = Dimensions.get('window')
const numOfCom = 4

export default function App() {
  const [isLoading, setIsLoading] = useState(true) //true면 로딩창, false면 메인창이 뜬다.
  const children = [<Loading />, <MainPage />]
  //return (isLoading ? (children[0]) : (children[1])) //로딩이 완료되면 메인페이지로

  return (
    <StackTab />
    //<AddPill />
    //<Login />
    //<Join />
    //<InputInfo />
  )
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  contentContainerStyle: { width: width * numOfCom }
})
