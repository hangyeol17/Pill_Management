import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Button,
  Alert,
  TextInput,
  Modal,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import PushNotification from 'react-native-push-notification';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export default function Calendar() {
  const [items, setItems] = useState({});
  const [isAgendaVisible, setIsAgendaVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [inputHour, setInputHour] = useState('9');
  const [inputMinute, setInputMinute] = useState('30');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    loadItems({ timestamp: Date.now() });
  }, []);

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
        }
      }

      const newItems = { ...items };
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    const handleDelete = (item) => {
      Alert.alert(
        '알람 삭제',
        '알람을 삭제하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              const dayItems = items[item.day] || [];
              const updatedItems = dayItems.filter((i) => i !== item);
    
              setItems((prevItems) => ({
                ...prevItems,
                [item.day]: updatedItems,
              }));
            },
          },
        ],
        { cancelable: true }
      );
    };
  
    return (
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View style={styles.deleteButtonContainer}>
              {item.name && <Text>{item.name}</Text>}
              <TouchableOpacity style={[styles.deleteButton]} onPress={() => handleDelete(item)}>
                <Text style={styles.buttonText}>알람 삭제</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleOpenPopup = () => {
    if (!selectedDate) {
      Alert.alert('날짜를 선택해주세요', '알람을 추가하려면 날짜를 선택해야 합니다.');
      return;
    }

    setInputHour('9');
    setInputMinute('30');
    setIsPopupVisible(true);
  };

  const handleConfirmTime = () => {
    const strTime = timeToString(selectedDate);
    const dayItems = items[strTime] || [];

    setItems({
      ...items,
      [strTime]: [
        ...dayItems,
        {
          name: `${inputHour}시 ${inputMinute}분에 약을 먹을 시간입니다`,
          height: Math.max(10, Math.floor(Math.random() * 150)),
          day: strTime,
        },
      ],
    });

    const alarmTime = new Date(selectedDate);
    alarmTime.setHours(parseInt(inputHour));
    alarmTime.setMinutes(parseInt(inputMinute));

    PushNotification.localNotificationSchedule({
      title: '알림',
      message: `${inputHour}시 ${inputMinute}분에 약을 먹을 시간입니다`,
      date: alarmTime,
    });

    setSelectedDate('');
    setIsPopupVisible(false);
  };

  const handleCancelTime = () => {
    setIsPopupVisible(false);
  };

  const handleHourScroll = (event, gestureState) => {
    if (gestureState) {
      const { nativeEvent } = event;
      const { contentOffset } = nativeEvent;
      const hour = Math.floor(contentOffset.y / 24);
      setInputHour(String(hour));
    }
  };
  
  const handleMinuteScroll = (event, gestureState) => {
    if (gestureState) {
      const { nativeEvent } = event;
      const { contentOffset } = nativeEvent;
      const minute = Math.floor(contentOffset.y / 24);
      setInputMinute(String(minute));
    }
  };  
  

  const panResponderHour = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => !scrollEnabled,
    onMoveShouldSetPanResponderCapture: (_, gestureState) => !scrollEnabled,
    onPanResponderMove: (event, gestureState) => {
      handleHourScroll(event, gestureState);
    },
    onPanResponderRelease: () => {
      setScrollEnabled(true);
    },
  });
  
  const panResponderMinute = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => !scrollEnabled,
    onMoveShouldSetPanResponderCapture: (_, gestureState) => !scrollEnabled,
    onPanResponderMove: (event, gestureState) => {
      handleMinuteScroll(event, gestureState);
    },
    onPanResponderRelease: () => {
      setScrollEnabled(true);
    },
  });

  return (
    <View style={styles.container}>
      {isAgendaVisible && (
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={selectedDate}
          onDayPress={(day) => setSelectedDate(day.timestamp)}
          refreshControl={null}
          showClosingKnob={true}
          refreshing={false}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleOpenPopup}>
        <Text style={styles.buttonText}>알람 추가</Text>
      </TouchableOpacity>

      <Modal visible={isPopupVisible} animationType="slide">
        <View style={styles.popupBackground}>
          <View style={styles.popupContainer}>
            <View style={styles.digitalClock}>
              <Text style={styles.digitalTime}>{inputHour}:{inputMinute}</Text>
            </View>
            <View style={styles.timePickerContainer}>
              <ScrollView
                style={styles.timePickerColumn}
                contentContainerStyle={styles.timePickerContentContainer}
                {...panResponderHour.panHandlers}
                scrollEnabled={scrollEnabled}
              >
                {[...Array(24)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.timePickerItem}
                    onPress={() => setInputHour(String(i))}
                  >
                    <Text>{i}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.timePickerSeparator}>:</Text>

              <ScrollView
                style={styles.timePickerColumn}
                contentContainerStyle={styles.timePickerContentContainer}
                {...panResponderMinute.panHandlers}
                scrollEnabled={scrollEnabled}
              >
                {[...Array(60)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.timePickerItem}
                    onPress={() => setInputMinute(String(i))}
                  >
                    <Text>{i}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="확인" onPress={handleConfirmTime} color={'#5AA6AE'} />
              <Button title="취소" onPress={handleCancelTime } color={'#5AA6AE'} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5AA6AE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  deleteButton:{
    top: 7,
    left: 145,
    backgroundColor: '#DA5454',
    paddingVertical: 6.5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 115,
    height: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  popupBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  digitalClock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  digitalTime: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timePickerColumn: {
    flex: 1,
    height: 200,
  },
  timePickerContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerItem: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerSeparator: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
