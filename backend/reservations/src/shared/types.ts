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

export type ContextVector = any[] //TODO: to be better typed

export type Context = {
    id_restaurant: number
    n_people: number
    restaurantLocation: LatLng
    currentDay: DAYS_WEEK
    reservationDay: DAYS_WEEK
    currentTime: TimeFormat
    reservationTime: TimeFormat
}
