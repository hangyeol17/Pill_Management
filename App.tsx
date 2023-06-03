import React from 'react'
import { ScrollView, Dimensions, SafeAreaView, StyleSheet} from 'react-native'

import MainPage from './src/screens/Main'
import Camera from './src/screens/Camera'
import Calendar from './src/screens/Calendar'
import Setting from './src/screens/Setting'

import BottomBar from './src/screens/BottomBar'

import Loading from './src/screens/Loading'
import Login from './src/screens/Login'
import Join from './src/screens/Join'
import InputInfo from './src/screens/InputInfo'
import AddPill from './src/screens/AddPill'
//푸시 알람

const { width } = Dimensions.get('window')
const numOfCom = 4

export default function App() {


  const children = [<Loading />, <MainPage />]
  const isLoading = true //true면 로딩창, false면 메인창이 뜬다.
  //return (isLoading ? (children[0]) : (children[1])) //로딩이 완료되면 메인페이지로

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        horizontal contentContainerStyle={[styles.contentContainerStyle]}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        <MainPage />
        <Camera />
        <Calendar />
        <Setting />
      </ScrollView>
      <BottomBar />
    </SafeAreaView>

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