import React from 'react'
import { ScrollView, Dimensions, SafeAreaView, StyleSheet, ActivityIndicator, Button, View } from 'react-native'

import MainPage from './src/screens/Main'
import Calendar from './src/screens/Calendar'
import Setting from './src/screens/Setting'
import BottomBar from './src/screens/BottomBar'
import Loading from './src/screens/Loading'
import Login from './src/screens/Login'
import Join from './src/screens/Join'
import InputInfo from './src/screens/InputInfo'
import AddPill from './src/screens/AddPill'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
//푸시 알람

const { width } = Dimensions.get('window')
const numOfCom = 4

async function Permission() {
  const newCameraPermission = await Camera.requestCameraPermission()
  const cameraPermission = await Camera.getCameraPermissionStatus()
  console.log(cameraPermission)
}

export default function App() {
  const children = [<Loading />, <MainPage />]
  const isLoading = true //true면 로딩창, false면 메인창이 뜬다.
  //return (isLoading ? (children[0]) : (children[1])) //로딩이 완료되면 메인페이지로

  Permission()
  const devices = useCameraDevices()
  const device = devices.back

  if (device == null) return <ActivityIndicator />

  return (
    // <SafeAreaView style={styles.safeAreaView}>
    //   <ScrollView
    //     horizontal contentContainerStyle={[styles.contentContainerStyle]}
    //     pagingEnabled
    //     showsHorizontalScrollIndicator={false}>
    //     <MainPage />
    //     <Calendar />
    //     <Setting />
    //   </ScrollView>
    //   <BottomBar />
    // </SafeAreaView>

    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />

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