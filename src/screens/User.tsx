import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as D from '../data';

export default function User() {
    const navigation = useNavigation()


    


   
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
  content: {
    backgroundColor: '#FFFFFF', // 흰색 배경
    padding: 20,
    height:'92%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
  },
  checkboxBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop:10,
  },
  checkboxLabel: {
    fontSize: 20,
    fontWeight:'bold'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 10,
    height:'25%',
    marginTop:5,
  },
  dateAndCheckboxWrapper: {
    marginBottom: 20,
  },
  dateButton1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 3.8, // 테두리 두께
    borderRadius: 100,
    width: '55%',
    height:'27%',
    marginTop:30,
  },
  dateText: {
    color: '#5AA6AE', // 원하는 색상으로 변경
    fontWeight:'bold',
    fontSize:18,
  },
  dateButton2: {
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 25,
    width:'55%',
    color: '#5AA6AE',
    textAlign: 'center',
    height:'57%',
    fontSize:20,
  },
  buttonInner: {
    borderColor: '#5FA9B1', 
    borderWidth: 3.5,
    width: '40%',
    borderRadius: 19,
    height:"55%",
    alignSelf: 'flex-end',
    marginTop:24,

  },
  dateButton123: {
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 10,
    height:'55%',
    marginTop:5,
  },
  healthView: {
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 30,
    backgroundColor:'#5FA9B1',
    width:'55%',
    height:'30%',
    marginBottom:5,
  }
  
});
