import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

import * as D from '../data'

//다른 화면으로 이동
const pressMove = () => { Alert.alert('pressed') }

export default function BottomBar() {
    return (
        <View style={[styles.view]}>
            <Icon name='home' size={40} color='black' onPress={pressMove} />
            <Icon name='calendar' size={40} color='black' onPress={pressMove} />
            <Icon name='camera' size={40} color='black' onPress={pressMove} />
            <Icon name='magnify' size={40} color='black' onPress={pressMove} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row', padding: 10, backgroundColor: 'lightblue',
        justifyContent: 'space-around'
    }
})