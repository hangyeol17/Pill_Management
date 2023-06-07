import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    <View style={styles.container}>
      <TouchableHighlight onPress={showDatepicker}>
        <Text style={styles.dateButton}>{inputs.dayy || '날짜 선택'}</Text>
      </TouchableHighlight>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.checkboxContainer}>
        {timeOptions.map((option) => (
          <View key={option.value} style={styles.checkboxWrapper}>
            <Checkbox.Item
              label={option.label}
              labelStyle={styles.checkboxLabel}
              status={inputs.timee.includes(option.value) ? 'checked' : 'unchecked'}
              onPress={() => handleTimeOptionChange(option.value)}
            />
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        value={inputs.pulse}
        placeholder="맥박을 입력해주세요.(숫자로)"
        onChangeText={handleInputChange('pulse')}
        ref={inputRefs.pulse}
      />
      <TextInput
        style={styles.input}
        value={inputs.blood_sugar}
        placeholder="혈당을 입력해주세요.(숫자로)"
        onChangeText={handleInputChange('blood_sugar')}
        ref={inputRefs.blood_sugar}
      />
      <TextInput
        style={styles.input}
        value={inputs.blood_pressure}
        placeholder="혈압을 입력해주세요.(숫자로)"
        onChangeText={handleInputChange('blood_pressure')}
        ref={inputRefs.blood_pressure}
      />
      <TextInput
        style={styles.input}
        value={inputs.temperature}
        placeholder="체온을 입력해주세요.(숫자로)"
        onChangeText={handleInputChange('temperature')}
        ref={inputRefs.temperature}
      />
      <TouchableHighlight style={styles.buttonContainer}>
        <Button title="저장" onPress={handleSaveButton} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 12,
  },
  buttonContainer: {
    width: '100%',
  },
  dateButton: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
});