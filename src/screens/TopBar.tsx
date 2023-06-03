import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import {Colors} from 'react-native-paper'

const onImg = () => {
    Alert.alert('사용자 정보창');
};
export default function TopBar() {
    return (
        <View style={[styles.safeArea]}>
            <View style={[styles.view]}>
                <Image
                    source={require('../assets/images/pillimg.png')}
                    style={[styles.mainImage]}
                />
                <Text style={[styles.text, styles.centerView]}> 약먹을시간 </Text>
                <Icon name='account-circle' size={35} color='white' onPress={onImg} />
            </View>
        </View>
    );
    //<Image source={require('../assets/images/menu.png')} style={[styles.menu]}></Image>
    //사용자 정보 추가할 것
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#B9EDDD',
    },
    view: {
        padding: 5,
        backgroundColor: '#87CBB9',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        margin: 20,
    },
    userImg: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    mainImage: { width: 20, height: 20, marginLeft: 10 },
    text: { fontSize: 25, color: 'white', textAlign: 'center' },
    menu: { width: 20, height: 20 },
    centerView: { flex: 1 },
});
