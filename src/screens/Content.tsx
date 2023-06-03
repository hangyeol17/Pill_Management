import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView } from 'react-native'
import { Alert, Button } from 'react-native'

/*
import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotificationService'
*/

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

//아이콘 react-native 기본말고 fontawesome 쓰고싶음 훨씬 멋있
import Pill from '../copy/Pill'
import * as D from '../data'

const name = D.randomName()
const pills: D.Pill[] = D.makeArray(3).map(D.createRandomPill) //pill을 담는 pills array

const pressImg = () => { Alert.alert('더 커진 이미지창 넣을 예정^^') }

export default function TopBar() {

    //여유 있으면 Text 변경 추가
    //아래 circleinsdie의 위쪽 name은 사용자 이름, 아래쪽 name은 약 이름이다. 아직 data를 수정하지 않아서 차이는 없음.
    return (
        <SafeAreaView style={[styles.safearea]}>
            <View style={[styles.view]}>
                <View style={[styles.circleview]}>
                    <View style={[styles.circleinside]}>
                        <Text>안녕하세요, {name}님</Text>
                        <View style={[styles.row]}>
                            <Image style={[styles.mainpillImage]} source={require('../assets/images/test1.jpg')} />
                            <Text>오늘의 약, 드셨나요?</Text>
                            <Text></Text>
                        </View>
                        <Image style={[styles.mainpillImg]} source={require('../assets/images/pill.jpg')}></Image>
                    </View>
                </View>
            </View>

            <View style={styles.scrollview}>
                <Text style={styles.listname}>내 복용 목록</Text>
                <FlatList data={pills}
                    renderItem={({ item }) => <Pill pill={item}></Pill>}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />} />
            </View>
        </SafeAreaView>
    )   
}

/**
 * 
 * <Button title="test" onPress={() => alert('remoteMessage')}></Button>
            <Button title="press" onPress={() => localNotificationService.cancelAllLocalNotifications()} />

            
 * 
    useEffect(() => {
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        function onRegister(token) {
            console.log('[App] onRegister : token : ', token);
        }

        function onNotification(notify) {
            console.log('[App] onNotification : notify :', notify);
            const options = {
                soundName: 'default',
                playSound: true,
            };
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options,
            );
        }

        function onOpenNotification(notify) {
            console.log('[App] onOpenNotification : notify :', notify);
            alert('Open Notification : notify.body :' + notify.body);
        }
        return () => {
            console.log('[App] unRegister');
            fcmService.unRegister();
            localNotificationService.unRegister();
        };
    }, []);
*/

const styles = StyleSheet.create({
    safearea: { flex: 1 },
    view: {
        flex: 1, backgroundColor: '#B9EDDD',
        alignItems: 'center',
        paddingBottom: 20
    },

    circleview: {
        //border추가
        flex: 0,
        color: 'white',
        width: 270,
        height: 270,
        borderRadius: 135,
        textAlign: 'center',
        backgroundColor: 'white',
        overflow: 'hidden'
    },

    circleinside: {
        //border추가
        flex: 1,
        color: 'white',
        width: 270,
        height: 300,
        borderRadius: 140,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 40,
    },

    mainpillImage: { height: 80, width: 80, borderRadius: 40 },
    row: {
        flex: 1, flexDirection: 'row'
    },

    mainpillImg: {
        width: 300, flex: 1, opacity: 0.7
    },

    scrollview: {
        flex: 1
    },

    scroll: {
        flexDirection: 'column', padding: 30
    },

    listname: {
        textAlign: 'center'
    },

    seperator: {
        borderWidth: 1, borderColor: '#DDDDDD'
    },
})