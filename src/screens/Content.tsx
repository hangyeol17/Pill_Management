import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView } from 'react-native'
import { Alert, Button } from 'react-native'
import Pill from '../copy/Pill'
import * as D from '../data'
import ocrOutput from '../OCR/output.json'

const name = D.randomName()

const dataLength = JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n').length)
const pills: D.Pill[] = D.makeArray(+dataLength).map(D.createRandomPill) //pill을 담는 pills array

export default function Content() {
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

const styles = StyleSheet.create({
    safearea: { flex: 1 },
    view: {
        flex: 1,
        backgroundColor: 'white',
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