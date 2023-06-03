import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image, View, TextInput, TouchableHighlight, Button } from 'react-native'
import { Alert } from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

import * as D from '../data'

const loginPress = () => Alert.alert('login pressed', 'hi')

export default function Loading() {
    return (
        <SafeAreaView style={[styles.flex]}>
            <View style={[styles.view]}>
                <Image source={require('../assets/images/pillimg.png')} style={[styles.mainImage]} />
                <Text style={[styles.text]}> 약먹을시간 </Text>
            </View>


            <View style={[styles.list]}>
                <Text>내정보 변경</Text>
                <Text>내 건강정보 입력</Text>
                <Text>내 건강통계</Text>
                <Text>추천하기</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1, backgroundColor: 'lightblue', flexDirenctoin: 'column',
        alignItem: 'center'
    },
    view: { padding: 20, flexDirection: 'row', alignItems: 'center' },
    mainImage: { width: 20, height: 20, marginRight: 10 },
    text: { fontSize: 25, color: 'white', textAlign: 'center' },
    list: { flex: 1 }
})