import {DAYS_WEEK, SEASONS} from './enums'

export type LatLng = {
    latitude: number
    longitude: number
}

export type ReservationInfo = {
    id: number
    id_user: number
    id_restaurant: number
    dateTime: Date
    n_people: number
}

export type TimeFormat = `${number}:${number}`
// type Hour = `${0 | 1 | 2}${0 | 1 | 2 | 3}`
// type Minute = `${0 | 1 | 2 | 3 | 4 | 5}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`

export type ContextVector = any[]

export type Context = {
    id_user: number
    id_restaurant: number
    // dateTime: Date
    n_people: number
    restaurantLocation: LatLng
    currentDay: DAYS_WEEK
    reservationDay: DAYS_WEEK
    currentTime: TimeFormat
    reservationTime: TimeFormat
}
