import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native'
import { TextInput, Button, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

import * as D from '../data'

const loginPress = () => Alert.alert('login pressed', 'hi')

export default function Login() {

    return (

        //이것도 자동로그인 되어 있으면 loading창, 아니면 로그인창으로 뜨도록
        <SafeAreaView style={[styles.flex]}>
            <View style={[styles.view]}>
                <Image source={require('../assets/images/pillimg.png')} style={[styles.mainImage]} />
                <Text style={[styles.text]}> 약먹을시간 </Text>
            </View>


            <View style={[styles.login]}>
                <Text>아이디</Text>
                <TextInput style={[styles.input]} defaultValue="" placeholder="여기를 눌러 아이디를 입력하세요"></TextInput>
                <Text>비밀번호</Text>
                <TextInput style={[styles.input]} defaultValue="" placeholder="여기를 눌러 비밀번호를 입력하세요"></TextInput>

                <TouchableHighlight style={[styles.loginBut]}><Button title="로그인" onPress={loginPress}></Button></TouchableHighlight>
                <TouchableHighlight style={[styles.loginBut]}><Button title="회원가입" onPress={loginPress}></Button></TouchableHighlight>

            </View>
        </SafeAreaView >
    )
    //<Image source={require('../assets/images/menu.png')} style={[styles.menu]}></Image> 메뉴 아이콘? 추가 고민중
    //<TouchableOpacity><Button title="로그인" onPress={loginPress}></Button></TouchableOpacity> 로그인 버튼 테스트용
}

const styles = StyleSheet.create({
    flex: {
        flex: 1, backgroundColor: 'lightblue', flexDirenctoin: 'column',
        alignItem: 'center'
    },
    view: { padding: 20, flexDirection: 'row', alignItems: 'center' },
    mainImage: { width: 20, height: 20, marginRight: 10 },
    text: { fontSize: 25, color: 'white', textAlign: 'center' },
    login: { textAlign: 'center', padding: 30 },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 25,
        paddingHorizontal: 15
    },
    loginBut: {
        marginTop: 20
    },
    menu: { width: 20, height: 20 }, //menu 안쓸거면 지우기
})