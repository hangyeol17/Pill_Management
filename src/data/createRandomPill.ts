import type {Pill} from './Pill'
import * as F from './faker'
import * as U from './util'

export const createRandomPill = (): Pill => {
    return {
        pre_id : F.randomId(),
        image: F.randomImage(),
        name: F.randomName(),
        manufacturer: F.randomName(),
        time:new Date,

        medication:{
            morning:F.randomBoolean(),
            lunch:F.randomBoolean(),
            dinner:F.randomBoolean(),
            day : new Date,
    },
}
}