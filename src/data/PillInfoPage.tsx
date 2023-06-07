import React, { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import ocrOutput from '../OCR/output.json';
import { parseString } from 'react-native-xml2js';
import { imageUrl, setImageUrl } from './PillData';

export type Pill = {
  arrNum: number;
  image: string;
  name: string;
  dayDose: number;
  unitDayDose: string;
  oneTimeDose: number;
  unitOneTimeDose: number;
  dayDoseNum: number;
  totalDoseDays: number;
};

export const serviceKey = 'MmfKBQs1mnlzNJLt3d6am7E7LVvd6SuCaBgZySf80%2BtNZoJk3D3rsP8Tq6Yf2d656111OGxTAVo7QrX0iZXmBw%3D%3D';

export const pillData: Pill = (arrNum: number) => {
  return {
    name: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[0]).replace(/\"/gi, ''),
    dayDose: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[1]).replace(/\"/gi, ''),
    unitDayDose: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[2]).replace(/\"/gi, ''),
    oneTimeDose: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[3]).replace(/\"/gi, ''),
    unitOneTimeDose: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[4]).replace(/\"/gi, ''),
    dayDoseNum: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[5]).replace(/\"/gi, ''),
    totalDoseDays: JSON.stringify(ocrOutput.images[0].fields[0].inferText.split('\n')[arrNum].split(' ')[6]).replace(/\"/gi, ''),
  };
};

const PillInfoPage = ({ item_name, array_number }) => {
  const [loading, setLoading] = useState(true);

  const fetchPillData = async () => {
    const response = await fetch(
      `http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?ServiceKey=${serviceKey}&item_name=가드본정` // 가드본정 부분 ${item_name} 수정
    );
    const text = await response.text();
    parseString(text, (err, result) => {
      const fetchedImageUrl = result.response.body[0].items[0].item[0].ITEM_IMAGE[0];
      setImageUrl(fetchedImageUrl || null);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPillData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const pill = pillData(2); // 2 => array_number 수정

  return (
    <View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
      <Text>Pill Name: {pill.name}</Text>
      <Text>Day Dose: {pill.dayDose}</Text>
      <Text>Unit Day Dose: {pill.unitDayDose}</Text>
      <Text>One-Time Dose: {pill.oneTimeDose}</Text>
      <Text>Unit One-Time Dose: {pill.unitOneTimeDose}</Text>
      <Text>Day Dose Num: {pill.dayDoseNum}</Text>
      <Text>Total Dose Days: {pill.totalDoseDays}</Text>
    </View>
  );
};

export default PillInfoPage;
