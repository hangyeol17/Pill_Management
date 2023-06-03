import {faker} from '@faker-js/faker'
import * as U from './util'

export const randomId = (): string => faker.datatype.uuid()
export const randomName = (): string => faker.name.fullName()

export const randomPillUrl = (name?:string): string => 
    U.pillUriByName(name ?? randomName())
export const randomDate = (): Date => faker.date.recent()
export const randomBoolean = (): boolean => faker.datatype.boolean()
export const randomParagraphs = (count: number = 2): string =>
    U.makeArray(count).map(faker.lorem.paragraph).join('\n')
export const randomImage = (): string =>
    U.unsplashUrl(U.random(100, 100), U.random(100, 100))