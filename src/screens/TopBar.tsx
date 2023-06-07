import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function TopBar() {
    return (
        <View style={{ backgroundColor: '#F2F7FD', elevation: 20 }}>
            <View style={styles.view}>
                <Text style={styles.text}>약먹을 시간</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#99CCFF',
    },
    text: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});