import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

export default function TopBar() {
    return (
        <View style={[styles.view]}>
            <Text style={[styles.text, styles.centerView]}>약먹을시간</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: { fontSize: 25, color: 'black' },
    centerView: { flex: 1 },
});
