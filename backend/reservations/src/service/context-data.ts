import {Context} from '../shared/types'
import {DAYS_WEEK} from '../shared/enums'

//TODO: This data has to be taken from the backend, this is for debugging reasons

export const pastContexts: Context[] = [
    {
        id_restaurant: 1,
        n_people: 4,
        restaurantLocation: {
            latitude: 41.909756,
            longitude: 12.350008,
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
            latitude: 41.908253,
            longitude: 12.354374,
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
            latitude: 41.912547,
            longitude: 12.353728,
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
            latitude: 41.911112,
            longitude: 12.350839,
        },
        currentDay: DAYS_WEEK.TUE,
        reservationDay: DAYS_WEEK.FRI,
        currentTime: '18:00',
        reservationTime: '20:30',
    },
]
