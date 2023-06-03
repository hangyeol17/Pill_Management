import React from 'react'
import type { FC } from 'react'
import { Text } from 'react-native'
import * as D from '../data'

export type PillProps = {
    pill: D.Pill
}

const Pill: FC<PillProps> = ({ pill }) => {
    return <Text>{JSON.stringify(pill, null, 2)}</Text>
}

export default Pill