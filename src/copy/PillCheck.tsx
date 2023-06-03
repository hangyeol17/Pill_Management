import React from 'react'
import type { FC } from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './PillCheck.style'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import moment from 'moment-with-locales-es6'

import * as D from '../data'

moment.locale('ko')

export type PillProps = {
    pill: D.Pill
}

const Pill: FC<PillProps> = ({ pill }) => {
    return (
        <View style={[styles.listview]}>
            <Text style={[styles.time]}>{moment(pill.time).format('h:mm')}</Text>
            <View style={[styles.pill]}>
                <Image style={[styles.pillImg]} source={{ uri: pill.image }}></Image>
                <View style={styles.textView}>
                    <Text style={[styles.pillText]}>{pill.name}</Text>
                </View>
                <BouncyCheckbox size={20} fillColor="red" unfillColor="#FFFFFF" iconStyle={{ borderColor: "red" }} />
            </View >
        </View>
    )
    //bouncycheckbox와 pill의 medication 값 일치화
}

export default Pill