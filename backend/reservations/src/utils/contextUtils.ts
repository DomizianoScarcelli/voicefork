import {pastContexts} from '../service/context-data'
import {DAYS_WEEK} from '../shared/enums'
import {ContextVector, Context, LatLng, TimeFormat} from '../shared/types'
import {distanceBetweenCoordinates} from './locationUtils'
/**
 * Given a certain context, returns the vector that represent that context
 */
export const contextToVector = (context: Context): ContextVector => {
    //TODO: give better weights
    const WEIGHTS = {
        id_restaurant: 1,
        n_people: 50,
        centroidDistance: 0.1,
        currentDay: 100,
        reservationDay: 100,
        currentHour: 30,
        currentMinute: 10,
        reservationHour: 50,
        reservationMinute: 20,
    }

    const {
        id_restaurant,
        n_people,
        centroidDistance,
        currentDay,
        reservationDay,
        currentTime,
        reservationTime,
    } = context

    // Split the currentTime and reservationTime strings into hours and minutes
    const [currentHour, currentMinute] = currentTime.split(':').map(Number)
    const [reservationHour, reservationMinute] = reservationTime
        .split(':')
        .map(Number)

    const vector: ContextVector = [
        id_restaurant * WEIGHTS.id_restaurant,
        n_people * WEIGHTS.n_people,
        centroidDistance! * WEIGHTS.centroidDistance,
        currentDay * WEIGHTS.currentDay,
        reservationDay * WEIGHTS.reservationDay,
        currentHour * WEIGHTS.currentHour,
        currentMinute * WEIGHTS.currentMinute,
        reservationHour * WEIGHTS.reservationHour,
        reservationMinute * WEIGHTS.reservationMinute,
    ]

    return vector
}

export const comptueAverageContext = (restaurantId: number): Context => {
    const avg = (field: keyof Context): number | LatLng | TimeFormat => {
        let accumulator1 = 0
        let accumulator2 = 0

        const NUM_RESERVATIONS = pastContexts.length
        switch (field) {
            case 'reservationTime':
            case 'currentTime':
                pastContexts.forEach(context => {
                    if (context.id_restaurant == restaurantId) {
                        const value = context[field] as TimeFormat
                        accumulator1 += parseInt(value.split(':')[0])
                        accumulator2 += parseInt(value.split(':')[1])
                    }
                })
                return `${accumulator1 / NUM_RESERVATIONS}:${
                    accumulator2 / NUM_RESERVATIONS
                }`

            case 'restaurantLocation':
                pastContexts.forEach(context => {
                    if (context.id_restaurant == restaurantId) {
                        const value = context[field] as LatLng
                        accumulator1 += value.latitude
                        accumulator2 += value.longitude
                    }
                })
                return {
                    latitude: accumulator1 / NUM_RESERVATIONS,
                    longitude: accumulator2 / NUM_RESERVATIONS,
                }
            default:
                pastContexts.forEach(context => {
                    if (context.id_restaurant == restaurantId) {
                        const value = context[field] as number
                        accumulator1 += value
                    }
                })
                return accumulator1 / NUM_RESERVATIONS
        }
    }

    const centroid = avg('restaurantLocation') as LatLng

    //TODO: this is not efficient because we have a number of for loops equal to the number of fields in the object
    // but since the reservations will not be so many, I think it's ok
    const avgContext: Context = {
        id_restaurant: restaurantId,
        n_people: avg('n_people') as number,
        restaurantLocation: centroid,
        centroidDistance: averageFromCentroid(centroid),
        currentDay: avg('currentDay') as number,
        reservationDay: avg('reservationDay') as DAYS_WEEK,
        currentTime: avg('currentTime') as TimeFormat,
        reservationTime: avg('reservationTime') as TimeFormat,
    }
    return avgContext
}

const averageFromCentroid = (centroid: LatLng) => {
    let accumulator = 0
    pastContexts.forEach(context => {
        accumulator += distanceBetweenCoordinates(
            centroid,
            context.restaurantLocation,
        )
    })
    return accumulator / pastContexts.length
}
