import {Context} from '../shared/types'
import {DAYS_WEEK} from '../shared/enums'

//TODO: This data has to be taken from the backend, this is for debugging reasons

export const pastContexts: Context[] = [
    {
        id_restaurant: 1,
        n_people: 4,
        restaurantLocation: {
            latitude: 41.8781,
            longitude: 12.6298,
        },
        currentDay: DAYS_WEEK.MON,
        reservationDay: DAYS_WEEK.TUE,
        currentTime: '12:12',
        reservationTime: '14:12',
    },
    {
        id_restaurant: 1,
        n_people: 4,
        restaurantLocation: {
            latitude: 41.8781,
            longitude: 12.8735,
        },
        currentDay: DAYS_WEEK.TUE,
        reservationDay: DAYS_WEEK.TUE,
        currentTime: '12:12',
        reservationTime: '19:15',
    },
    {
        id_restaurant: 1,
        n_people: 2,
        restaurantLocation: {
            latitude: 40.7128,
            longitude: 12.7398,
        },
        currentDay: DAYS_WEEK.SUN,
        reservationDay: DAYS_WEEK.MON,
        currentTime: '10:30',
        reservationTime: '19:45',
    },
    {
        id_restaurant: 1,
        n_people: 3,
        restaurantLocation: {
            latitude: 34.0522,
            longitude: -118.2437,
        },
        currentDay: DAYS_WEEK.TUE,
        reservationDay: DAYS_WEEK.FRI,
        currentTime: '18:00',
        reservationTime: '20:30',
    },
]
