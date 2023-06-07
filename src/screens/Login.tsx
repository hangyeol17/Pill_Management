import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native'
import { TextInput, Button, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'

export default function Login({ navigation }) {
    return (
        <SafeAreaView style={[styles.flex]}>
            <View style={[styles.view]}>
                <Image source={require('../assets/images/pillimg.png')} style={[styles.mainImage]} />
                <Text style={[styles.text]}> 약먹을시간 </Text>
            </View>
            <View style={[styles.login]}>
                <Text>아이디</Text>
                <TextInput style={[styles.input]} defaultValue="" placeholder="여기를 눌러 아이디를 입력하세요"></TextInput>
                <Text>비밀번호</Text>
                <TextInput style={[styles.input]} defaultValue="" placeholder="여기를 눌러 비밀번호를 입력하세요" secureTextEntry></TextInput>
                <TouchableHighlight style={[styles.loginBut]}><Button title="로그인" onPress={() => navigation.navigate('StackTab')}></Button></TouchableHighlight>
                <TouchableHighlight style={[styles.loginBut]}><Button title="회원가입" onPress={() => navigation.navigate('Register')}></Button></TouchableHighlight>
            </View>
        </SafeAreaView >
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