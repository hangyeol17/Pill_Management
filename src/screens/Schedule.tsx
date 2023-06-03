import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native'
import { Alert, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
//import {Colors} from 'react-native-paper'

import Pill from './Pill'
import * as D from '../data'

const name = D.randomName()

const onImg = () => {
    Alert.alert('사용자 정보창');
};

const pressImg = () => { Alert.alert('더 커진 이미지창 넣을 예정^^') }

const pills = D.makeArray(5).map((notUsed) => D.randomPillUrl()) //notUsed //pill을 담는 pills array


export default function Schedule() {

    const children = pills.map((pillUrl, index) => ( //약 목록에 넣을 data를 일단 faker로 생성해서 배열 형성. 나중에 db로 가져와야 함.
        <View style={[styles.listview]}>
            <Text style={[styles.time]}>오후 12:00</Text>
            <View key={index.toString()} style={[styles.pill]}>
                <Image style={[styles.pillImg]} source={{ uri: pillUrl }}></Image>
                <Text style={[styles.pillText]}>약이름</Text>
                <BouncyCheckbox size={20} fillColor="red" unfillColor="#FFFFFF" iconStyle={{ borderColor: "red" }} />
            </View >
        </View>



    ))

    //여유 있으면 Text 변경 추가
    //아래 circleinsdie의 위쪽 name은 사용자 이름, 아래쪽 name은 약 이름이다. 아직 data를 수정하지 않아서 차이는 없음.
    return (
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

            <ScrollView style={[styles.scroll]}>
                <Text style={[styles.listname]}>5월 12일 일요일</Text>
                <Text style={[styles.listname, styles.total]}>오늘의 약 총 0/3</Text>

                <View>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        flex: 0.25,
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
        color: '298FEB'
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
        color: '#87CBB9',
        fontWeight: 'bold',
        marginLeft: 40,
        fontSize: 20,
    },

    total: {
        fontSize: 18,
        color: '#C6C6C6',
        fontWeight: 'normal',
        marginBottom: 20,
    },

    scroll: {
        flexDirection: 'column',
        paddingVertical: 20,
        flex: 1,
        backgroundColor: 'white',
    },

    listview: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5, backgroundColor: 'white',
        marginHorizontal: 25,
        marginVertical: 10,
    }, //listview 마지막 child에 paddingBottom 추가

    time: {
        fontSize: 18,
        width: 100
    },

    pill: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 20,
        marginRight: 10,
    },

    pillText: {
        padding: 10,
        fontSize: 16,
    },

    pillImg: {
        width: 50,
        height: 50
    },

})