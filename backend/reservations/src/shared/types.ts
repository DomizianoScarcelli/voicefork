import {DAYS_WEEK} from './enums'

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

export type ReservationContext = {
    id_restaurant: number
    n_people: number
    timestamp?: Date
    reservationLocation: LatLng
    centroidDistance?: number
    timeDistanceFromCurrent?: number
    timeDistanceFromReservation?: number
    currentDay: DAYS_WEEK
    reservationDay: DAYS_WEEK
    currentTime?: TimeFormat
    reservationTime?: TimeFormat
    numberOfReservations?: number
    ageFactor?: number
}
