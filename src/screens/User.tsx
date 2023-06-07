import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Button, Alert, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import TopBar_health from './TopBar_health';

interface Inputs {
  dayy: string;
  timee: string[];
  pulse: string;
  blood_sugar: string;
  blood_pressure: string;
  temperature: string;
}

const timeOptions = [
  { value: 'morning', label: '아침' },
  { value: 'lunch', label: '점심' },
  { value: 'dinner', label: '저녁' },
];

export default function User() {
  const inputRefs = {
    pulse: useRef<TextInput>(null),
    blood_sugar: useRef<TextInput>(null),
    blood_pressure: useRef<TextInput>(null),
    temperature: useRef<TextInput>(null),
  };

  const [inputs, setInputs] = useState<Inputs>({
    dayy: '',
    timee: [],
    pulse: '',
    blood_sugar: '',
    blood_pressure: '',
    temperature: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field: keyof Inputs) => (text: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field]: text,
    }));
  };

  const handleTimeOptionChange = (option: string) => {
    setInputs((prevInputs) => {
      const isChecked = prevInputs.timee.includes(option);
      let updatedOptions: string[];

      if (isChecked) {
        updatedOptions = prevInputs.timee.filter((item) => item !== option);
      } else {
        updatedOptions = [...prevInputs.timee, option];
      }

      return {
        ...prevInputs,
        timee: updatedOptions,
      };
    });
  };

  const handleSaveButton = () => {
    console.log('저장 버튼이 클릭되었습니다.');
    console.log('입력한 데이터:', inputs);

    const isEmpty = Object.values(inputs).some((value) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return value.trim() === '';
    });

    if (isEmpty) {
      Alert.alert('입력 오류', '모든 입력 칸을 채워주세요.');
      return;
    }

    for (const field in inputRefs) {
      inputRefs[field as keyof typeof inputRefs].current?.clear();
    }

    executeServerMain();
  };

  const executeServerMain = async () => {
    try {
      await axios.post(`http://192.168.200.162:4903/in`, inputs);
      console.log(inputs);
      console.log('서버의 main 함수 실행 완료');
      Alert.alert('저장 완료', '데이터가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('서버 연결 에러:', error);
      Alert.alert('저장 실패', '데이터 저장에 실패했습니다.');
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setInputs((prevInputs) => ({
        ...prevInputs,
        dayy: formattedDate,
      }));
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={{flex:1,}}>
      <TopBar_health />
      <View style={styles.content}>
      <Text style={{fontSize: 18,fontWeight:'bold',color:'#5AA6AE',}}>   날짜 및 시각</Text>
        <View style={styles.dateButton}>
          <TouchableHighlight onPress={showDatepicker} style={[styles.dateButton1]}>
          <Text style={styles.dateText}>{inputs.dayy || '날짜 선택'}</Text>
          </TouchableHighlight>
          <View style={styles.checkboxBox}>
            {timeOptions.map((option) => (
              <Checkbox.Item
                key={option.value}
                label={option.label}
                labelStyle={[styles.checkboxLabel, { color: '#5AA6AE' }]}
                status={inputs.timee.includes(option.value) ? 'checked' : 'unchecked'}
                color="#5AA6AE"
                onPress={() => handleTimeOptionChange(option.value)}
              />
            ))}
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker value={new Date()} mode="date" display="default" onChange={handleDateChange} />
        )}


<View style={{ flexDirection: 'row', height: '10%',}}>
<View style={{width:'50%' }}><Text style={{ fontSize: 18, fontWeight: 'bold', color: '#5AA6AE',marginTop:28}}>   현재 상태 입력</Text></View>
<View style={{width:'50%' }}>
  <TouchableOpacity style={[styles.buttonInner]} onPress={handleSaveButton}>
    <Text style={{ color: '#5AA6AE', fontWeight: 'bold', fontSize: 18, textAlign: 'center', textAlignVertical: 'bottom' }}>저장</Text>
  </TouchableOpacity>
  </View>
</View>


        <View style={styles.dateButton123}>
        
        <View style={{width:"100%",margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',height:"45%"}}>
        <View style={{width:"50%",margin:5,flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
          <View style={[styles.healthView, { marginLeft:10}]}><Text style={{color:'#FFFFFF',fontSize:18,textAlign:'center',marginTop:3,}}>맥박</Text></View>
          <TextInput
          style={[styles.dateButton2, { marginLeft:10}]}
          value={inputs.pulse}
          placeholder="입력하기"
          onChangeText={handleInputChange('pulse')}
          ref={inputRefs.pulse}/>
          </View>
        
        <View style={{width:"50%",margin:5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <View style={[styles.healthView, { marginRight:10}]}><Text style={{color:'#FFFFFF',fontSize:18,textAlign:'center',marginTop:3,}}>혈당</Text></View>
        <TextInput
          style={[styles.dateButton2, { marginRight:10}]}
          value={inputs.blood_sugar}
          placeholder="입력하기"
          onChangeText={handleInputChange('blood_sugar')}
          ref={inputRefs.blood_sugar}
        />
        </View>
        </View>


        <View style={{width:"100%",margin:5,flexDirection:'row',justifyContent:'center',alignItems:'center',height:"45%"}}>
        <View style={{width:"50%",margin:5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <View style={[styles.healthView, { marginLeft:10}]}><Text style={{color:'#FFFFFF',fontSize:18,textAlign:'center',marginTop:3,}}>혈압</Text></View>
          <TextInput
          style={[styles.dateButton2, { marginLeft:10}]}
          value={inputs.blood_pressure}
          placeholder="입력하기"
          onChangeText={handleInputChange('blood_pressure')}
          ref={inputRefs.blood_pressure}/>
          </View>
        
        <View style={{width:"50%",margin:5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <View style={[styles.healthView, { marginRight:10}]}><Text style={{color:'#FFFFFF',fontSize:18,textAlign:'center',marginTop:3,}}>체온</Text></View>
        <TextInput
          style={[styles.dateButton2, { marginRight:10}]}
          value={inputs.temperature}
          placeholder="입력하기"
          onChangeText={handleInputChange('temperature')}
          ref={inputRefs.temperature}
        />
        </View>
        </View>
        </View>
      </View>
    </View>
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
