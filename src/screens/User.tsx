import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as D from '../data';

export default function User() {
    const navigation = useNavigation()

    const handleItemClick = (item) => {
        if (item === '개인 정보 변경') {
            navigation.navigate('UserData');
        } else if (item === '약 정보 입력') {
            navigation.navigate('PillInfoPage')
        } else {
            console.log('Clicked:', item);
        }
    };


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleItemClick(item)}>
                <View style={styles.listItemContainer}>
                    <Text style={styles.listItemText}>{item}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/pillimg.png')} style={styles.mainImage} />
                <Text style={styles.title}>약먹을 시간</Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={['개인 정보 변경', '약 정보 입력', '내 건강 통계', '추천하기']}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    mainImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'left',
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listItemContainer: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    listItemText: {
        fontSize: 20,
    },
});
