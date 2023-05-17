import {Context} from '../shared/types'
import {DAYS_WEEK} from '../shared/enums'

export const pastContexts: Context[] = [
    {
        id_user: 123,
        id_restaurant: 1,
        n_people: 4,
        restaurantLocation: {
            latitude: 41.8781,
            longitude: -87.6298,
        },
        currentDay: DAYS_WEEK.MON,
        reservationDay: DAYS_WEEK.TUE,
        currentTime: '12:12',
        reservationTime: '14:12',
    },
    {
        id_user: 123,
        id_restaurant: 1,
        n_people: 4,
        restaurantLocation: {
            latitude: 41.8781,
            longitude: -87.6298,
        },
        currentDay: DAYS_WEEK.TUE,
        reservationDay: DAYS_WEEK.TUE,
        currentTime: '12:12',
        reservationTime: '19:15',
    },
    {
        id_user: 123,
        id_restaurant: 1,
        n_people: 2,
        restaurantLocation: {
            latitude: 40.7128,
            longitude: -74.006,
        },
        currentDay: DAYS_WEEK.SUN,
        reservationDay: DAYS_WEEK.MON,
        currentTime: '10:30',
        reservationTime: '19:45',
    },
    {
        id_user: 123,
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
