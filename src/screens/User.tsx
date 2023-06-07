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
  { value: 'mor', label: '아침' },
  { value: 'lun', label: '점심' },
  { value: 'din', label: '저녁' },
];

export default function Setting() {
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
      <Text >'날짜 및 시각'</Text>
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


<View style={{flexDirection: 'row', justifyContent: 'flex-end',flex:1,}}>
  <TouchableOpacity
    style={[styles.buttonInner]}
    onPress={handleSaveButton}
  >
    <View >
    <Text style={{ color: '#5AA6AE', fontWeight:'bold',fontSize:18, textAlign:'center',}}>저장</Text>
    </View>
  </TouchableOpacity>
  </View>

        <View style={styles.dateButton123}>
        <Text>맥박 {inputs.pulse}</Text>
        <TextInput
          style={styles.dateButton2}
          value={inputs.pulse}
          placeholder="입력하기"
          onChangeText={handleInputChange('pulse')}
          ref={inputRefs.pulse}
        />
        <Text>혈당 {inputs.blood_sugar}</Text>
        <TextInput
          style={styles.dateButton2}
          value={inputs.blood_sugar}
          placeholder="입력하기"
          onChangeText={handleInputChange('blood_sugar')}
          ref={inputRefs.blood_sugar}
        />
        <Text>혈압 {inputs.blood_pressure}</Text>
        <TextInput
          style={styles.dateButton2}
          value={inputs.blood_pressure}
          placeholder="입력하기"
          onChangeText={handleInputChange('blood_pressure')}
          ref={inputRefs.blood_pressure}
        />
        <Text>체온 {inputs.temperature}</Text>
        <TextInput
          style={styles.dateButton2}
          value={inputs.temperature}
          placeholder="입력하기"
          onChangeText={handleInputChange('temperature')}
          ref={inputRefs.temperature}
        />
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
    borderRadius: 8,
    height:'30%',
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
  },
  dateText: {
    color: '#5AA6AE', // 원하는 색상으로 변경
    fontWeight:'bold',
    fontSize:18,
  },
  dateButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 25,
    width:'25%',
    height:'13%',
    color: '#5AA6AE',
    textAlign: 'center',
  },
  buttonInner: {
    backgroundColor: '#FFFFFF', 
    borderColor: '#5FA9B1', 
    borderWidth: 3.5,
    width: '20%',
    borderRadius: 19,
    height:"65%",
  },
  dateButton123: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5AA6AE', // 변경된 테두리 색상
    borderWidth: 4, // 테두리 두께
    borderRadius: 8,
    height:'50%',
  },
  
});
