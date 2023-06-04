import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, ActivityIndicator } from 'react-native'
import { TextInput, Button, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

import * as D from '../data'

export default function Cam() {
    const devices = useCameraDevices()
    const device = devices.back

    if (device == null) return <ActivityIndicator />

    return (
        <Camera
            style={StyleSheet.absoluteFill}
            photo={true}
            device={device}
            isActive={true}
        />
    )
}

const styles = StyleSheet.create({
})