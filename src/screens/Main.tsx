import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'
import TopBar from './TopBar'
import Content from './Content'

import * as D from '../data'

export default function Loading() {
    return (
        <SafeAreaView style={[styles.flex]}>
            <TopBar />
            <Content />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: 'white' },
})