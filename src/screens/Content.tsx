import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ocrOutput from '../OCR/output.json';
import { imageUrl } from '../data/PillData';

export default function Content() {
    const [news, setNews] = useState([]);
    const navigation = useNavigation();
    const [pillData, setPillData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [resetting, setResetting] = useState(false);

    const createPillData = () => {
        const dataLength = ocrOutput?.images?.[0]?.fields?.[0]?.inferText?.split('\n').length || 0;
        const pillData = [];

        for (let i = 0; i < dataLength; i++) {
            const name = ocrOutput?.images?.[0]?.fields?.[0]?.inferText?.split('\n')?.[i]?.split(' ')?.[0]?.replace(/\"/gi, '');
            const image = imageUrl && imageUrl[i] ? imageUrl[i] : null;
            pillData.push({
                name,
                image,
            });
        }

        return pillData;
    };

    const fetchHealthNews = async () => {
        const apiKey = '2d208b3439fc448895a9dd7031ffd4ab';
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'ok') {
            setNews(result.articles);
        }
    };

    const fetchData = async () => {
        setRefreshing(true);

        await fetchHealthNews();
        const generatedPillData = createPillData();
        setPillData(generatedPillData);

        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = async () => {
        console.log('refresh button pressed')
        await fetchData();
    };

    const handleReset = () => {
        Alert.alert(
            '목록 초기화',
            '약 복용 목록을 초기화 하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                { text: '초기화', onPress: () => resetDoseList() },
            ],
            { cancelable: false }
        );
    };

    const resetDoseList = () => {
        setPillData([]);
    };

    const renderPillItem = ({ item }) => {
        return (
            <View>
                <View style={styles.pillItem}>
                    <Text style={styles.pillText}>{item.name}</Text>
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.pillImage} />
                    ) : (
                        <Image source={require('../assets/images/pillimg.png')} style={styles.pillImage} />
                    )}
                </View>
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
                    <View style={styles.refreshPlusContainer}>
                        <TouchableOpacity onPress={handleRefresh}>
                            <Icon name="refresh-cw" size={24} color="#5AA6AE" style={styles.refreshIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReset}>
                            <Icon name="x" size={24} color="#5AA6AE" style={styles.resetIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toPersonalData()}>
                            <Icon name="plus-square" size={24} color="#5AA6AE" style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flatlistContainer}>
                    {refreshing ? (
                        <Text style={styles.loadingMessage}>Loading...</Text>
                    ) : pillData.length > 0 ? (
                        <FlatList
                            data={pillData}
                            renderItem={renderPillItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    ) : (
                        <Text style={styles.emptyMessage}>복용 목록이 비어 있습니다.</Text>
                    )}
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>건강 뉴스</Text>
                </View>
                <View style={styles.hrFlatlistContainer}>
                    {refreshing ? (
                        <Text style={styles.loadingMessage}>Loading...</Text>
                    ) :
                        <FlatList
                            data={news}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />}
                </View>
            </View>
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
        marginRight: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#5AA6AE',
    },
    refreshPlusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    refreshIcon: {
        marginLeft: 10,
    },
    resetIcon: {
        marginLeft: 10,
    },
    plusIcon: {
        marginLeft: 10,
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
    loadingMessage: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#5AA6AE',
    },
    emptyMessage: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#5AA6AE',
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
    pillText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#5AA6AE',
    },
    pillImage: {
        height: 25,
        width: 25,
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
        color: '#5AA6AE',
    },
});

