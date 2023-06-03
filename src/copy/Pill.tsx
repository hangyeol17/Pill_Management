import React from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './Pill.style'
import moment from 'moment-with-locales-es6'

import * as D from '../data'

moment.locale('ko')

export type PillProps = {
    pill: D.Pill
}

const Pill = (props: PillProps) => (
    <View style={[styles.listview]}>
        <Image style={[styles.pillImage]} source={{ uri: props.pill.image }}></Image>
        <View style={[styles.centerView]}>
            <Text style={[styles.text]}>{props.pill.name}</Text>
        </View>
        <Image style={[styles.editImage]} source={require('../assets/images/edit.png')} />
    </View >
)

export default Pill