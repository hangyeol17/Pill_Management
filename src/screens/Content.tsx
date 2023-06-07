import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ocrOutput from '../OCR/output.json';
import { imageUrl } from '../data/PillData';

import * as D from '../data';

const name = D.randomName();
let dataLength = 0;
const pillData = [];

dataLength = +JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n').length);

for (let i = 0; i < dataLength; i++) {
    const name = JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[i].split(' ')[0]).replace(/\"/gi, '');
    const itemImageUrl = `https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/150488501735800064`
    // Access imageUrl based on the item index
    pillData.push({
        name,
        imageUrl: itemImageUrl
    });
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
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'ok') {
            setNews(result.articles);
        }
    };

    const renderPillItem = ({ item }) => {
        return (
            <View>
                <View style={styles.pillItem}>
                    <Text style={styles.pillText}>{item.name}</Text>
                </View>
                <Image source={{ uri: item.imageUrl }} style={styles.pillImage} />
            </View>
        );
    };

    const renderItem = ({ item }) => {
        const openNewsURL = () => {
            if (item.url) {
                Linking.openURL(item.url);
            }
        };

        return (
            <TouchableOpacity onPress={openNewsURL}>
                <View style={styles.recommendationItem}>
                    <Text style={styles.recommendationContent}>{item.content}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item) => {
        if (item.id) {
            return item.id.toString();
        }
        if (item.url) {
            return item.url;
        }
        return `item-${Math.random()}`;
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
                        <Icon name="plus-square" size={24} color="#5AA6AE" style={styles.plusIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        data={pillData}
                        renderItem={renderPillItem}
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
            {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: '#FAFCFC',
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
        color: '#5AA6AE',
    },
    plusIcon: {
        marginRight: 10,
    },
    flatlistContainer: {
        flex: 1,
        borderWidth: 3,
        borderColor: '#5FA9B1',
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        elevation: 5,
    },
    pillItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#red',
        borderRadius: 8,
        marginVertical: 4,
    },
    pillImage: {
        flex: 1
    },
    pillText: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#5AA6AE'
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
    hrFlatlistContainer: {
        flex: 0.8,
        borderWidth: 3,
        borderColor: '#5FA9B1',
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
        color: '#5AA6AE',
    },
    recommendationContent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5AA6AE'
    },
});