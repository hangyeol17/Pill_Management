export type Pill={ //약정보
    pre_id: string
    name : string
    image: string
    //comments: string //아직...미련이...
    manufacturer: string
    time:Date

    medication:{
        morning:boolean
        lunch:boolean
        dinner:boolean
        day: Date
    }
}