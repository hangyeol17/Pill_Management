import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image, View, ScrollView, FlatList } from 'react-native'
import { Alert, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

import TopBar from './TopBar'
import Pill from '../copy/PillCheck'
import * as D from '../data'

const name = D.randomName()

const onImg = () => {
    Alert.alert('사용자 정보창');
};

const pressImg = () => { Alert.alert('더 커진 이미지창 넣을 예정^^') }

const pills: D.Pill[] = D.makeArray(3).map(D.createRandomPill) //pill을 담는 pills array

//버튼에 의한 화면전환을 아직 할 수 없음. main을 실행하면 content창, calendar을 실행하면 schedule 창. 이런식으로 일단 만들어놓음 ㅠ
//어떻게 하는지 아는사람
export default function Calendar() {

    //여유 있으면 Text 변경 추가
    //아래 circleinsdie의 위쪽 name은 사용자 이름, 아래쪽 name은 약 이름이다. 아직 data를 수정하지 않아서 차이는 없음.
    return (

        <SafeAreaView style={[styles.flex]}>
            <SafeAreaView style={[styles.safearea]}>
                <View style={[styles.topview]}>
                    <Image
                        source={require('../assets/images/pillimg.png')}
                        style={[styles.mainImage]}
                    />
                    <Text style={[styles.text, styles.centerView]}> 복용 기록 </Text>
                    <Icon name='account-circle' size={35} color='white' onPress={onImg} />
                </View>

                <View style={[styles.view]}>
                    <View style={[styles.calendar]}>
                        <View style={[styles.row]}>
                            <View style={[styles.day]}><Text>월</Text></View>
                            <View style={[styles.day]}><Text>화</Text></View>
                            <View style={[styles.day]}><Text>수</Text></View>
                            <View style={[styles.day]}><Text>목</Text></View>
                            <View style={[styles.day]}><Text>금</Text></View>
                            <View style={[styles.day]}><Text style={[styles.saturday]}>토</Text></View>
                            <View style={[styles.day]}><Text style={[styles.sunday]}>일</Text></View>
                        </View>

                        <View style={[styles.row]}>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>8</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>9</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>10</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>11</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText, styles.today]}>12</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>13</Text></View>
                            <View style={[styles.date]}><Text style={[styles.dateText]}>14</Text></View>
                        </View>
                    </View>
                </View>

                <View style={[styles.listname]}>
                    <Text style={[styles.name]}>5월 12일 일요일</Text>
                    <Text style={[styles.name, styles.total]}>오늘의 약 총 0/3</Text>
                </View>
                <FlatList data={pills}
                    renderItem={({ item }) => <Pill pill={item}></Pill>}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />} />
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: 'white' },
    safearea: {
        flex: 1
    },
    topview: {
        padding: 5,
        backgroundColor: '#87CBB9',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        margin: 20,
    },
    mainImage: { width: 20, height: 20, marginLeft: 10 },
    userImg: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    text: { fontSize: 25, color: 'white', textAlign: 'center' },
    centerView: { flex: 1 },

    view: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        flex: 2,
        alignItems: 'center',
        paddingBottom: 20
    },

    calendar: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
    },

    row: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    day: {
        width: 50,
        alignItems: 'center'
    },

    saturday: {
        color: '#298FEB'
    },

    sunday: {
        color: '#EB5743'
    },

    date: {
        width: 50,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    today: {
        backgroundColor: '#EDF0F1',
        borderRadius: 25,
        fontWeight: 'bold',
    },

    dateText: {
        padding: 10,
        fontSize: 18,
    },

    holidayText: {
        color: 'red'
    },

    listname: {
        paddingLeft: 40,
        paddingTop: 20,
    },

    name: {
        color: '#87CBB9',
        fontWeight: 'bold',
        fontSize: 20,
    },

    total: {
        fontSize: 18,
        color: '#C6C6C6',
        fontWeight: 'normal',
        marginBottom: 20,
    },

    seperator: {
        borderWidth: 1, borderColor: '#DDDDDD'
    },
})