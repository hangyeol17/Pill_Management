import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import TopBar from './TopBar'
import Content from './Content'

export default function Main() {
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