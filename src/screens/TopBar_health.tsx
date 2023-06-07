import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function TopBar_health() {
    return (
        <View style={{ backgroundColor: '#6EBAB1', elevation: 20 }}>
            <View style={styles.view}>
                <Text style={styles.text}>건강 정보 입력</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        borderBottomColor: '#6EBAB1',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#6EBAB1',
    },
    text: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});