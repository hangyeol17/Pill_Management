import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import UserData from './UserData'

import * as D from '../data';
import ocrOutput from '../OCR/output.json';

const name = D.randomName();
let dataLength = 0;
const pillData = [];

try {
    dataLength = +JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n').length);
} catch (error) {
    console.error('Error reading output.json:', error);
}

for (let i = 0; i < dataLength; i++) {
    try {
        pillData[i] = JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[i].split(' ')[0]).replace(/\"/gi, '');
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

export default function Content() {
    const [news, setNews] = useState([]);
    const navigation = useNavigation()

    useEffect(() => {
        fetchHealthNews();
    }, []);

    const fetchHealthNews = async () => {
        const apiKey = '2d208b3439fc448895a9dd7031ffd4ab';
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.status === 'ok') {
                setNews(result.articles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: { id: number; content: string; } }) => (
        <View style={styles.recommendationItem}>
            <Text style={styles.recommendationContent}>{item.content}</Text>
        </View>
    );

    const keyExtractor = (item: { id: number | undefined }) => {
        if (typeof item.id === 'undefined') {
            return `item-${Math.random()}`;
        }

        return item.id.toString();
    };

    const toPersonalData = () => {
        navigation.navigate('UserData');
    };

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.scrollView}>
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>내 복용 목록</Text>
                    <TouchableOpacity onPress={() => toPersonalData()}>
                        <Icon name="plus" size={24} color="#000" style={styles.plusIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        data={pillData}
                        renderItem={({ item }) => (
                            <View style={styles.pillItem}>
                                <Text style={styles.pillText}>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>건강 뉴스</Text>
                </View>
                <View style={styles.hrFlatlistContainer}>
                    <FlatList
                        data={news}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    /></View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: '#F2F7FD',
    },
    scrollView: {
        flex: 0.8,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginLeft: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#3854A6',
    },
    plusIcon: {
        marginRight: 10,
    },
    flatlistContainer: {
        flex: 1,
        borderWidth: 2.5,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        elevation: 5,
    },
    pillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
    },
    pillText: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    separator: {
        height: 2,
        backgroundColor: '#DDDDDD',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#3854A6',
    },
    hrFlatlistContainer: {
        flex: 0.8,
        borderWidth: 2.5,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: '#FFFFFF',
        elevation: 5,
    },
    recommendationItem: {
        marginVertical: 10,
        marginLeft: 10,
    },
    recommendationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3854A6',
    },
    recommendationContent: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});