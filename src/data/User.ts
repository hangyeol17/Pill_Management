export type User={ //사용자 정보, 건강 정보
    id: string
    image: string
    name: string
    birthday : Date
    sex : string

    health_data:{
        height : number
        weight : number
        modifiedDate : Date
        pulse : number //맥박
        blood_sugar : number //혈당
        blood_pressure : number //혈압
        temperature : number //체온
    }
}