import {Context} from 'vm'
import {DAYS_WEEK} from '../shared/enums'
import {
    ContextVector,
    ReservationContext,
    LatLng,
    TimeFormat,
} from '../shared/types'
import {distanceBetweenCoordinates} from './locationUtils'
import {timeToSecondsFromMidnight} from './timeUtils'
/**
 * Given a certain context, returns the vector that represent that context
 */
export const contextToVector = (context: ReservationContext): ContextVector => {
    const {
        id_restaurant,
        n_people,
        centroidDistance,
        currentDay,
        reservationDay,
        timeDistanceFromCurrent,
        timeDistanceFromReservation,
    } = context

    // * 1 in order to cast strings to intergers
    const vector: ContextVector = [
        id_restaurant * 1,
        n_people * 1,
        centroidDistance! * 1,
        currentDay * 1,
        reservationDay * 1,
        timeDistanceFromCurrent! * 1,
        timeDistanceFromReservation! * 1,
    ]

    return vector
}

export const computeAverageContext = (
    restaurantId: number,
    context: ReservationContext[],
): ReservationContext => {
    const avg = (
        field: keyof ReservationContext,
    ): number | LatLng | TimeFormat => {
        let accumulator1 = 0
        let accumulator2 = 0

        const NUM_RESERVATIONS = context.length
        switch (field) {
            case 'reservationTime':
            case 'currentTime':
                context.forEach(item => {
                    //TODO: use reduce instead of foreach
                    if (item.id_restaurant == restaurantId) {
                        const value = item[field] as TimeFormat
                        const secondFromMidnight =
                            timeToSecondsFromMidnight(value)
                        accumulator1 += secondFromMidnight
                    }
                })
                return accumulator1 / NUM_RESERVATIONS

            case 'reservationLocation':
                context.forEach(item => {
                    if (item.id_restaurant == restaurantId) {
                        const value = item[field] as LatLng
                        accumulator1 += value.latitude
                        accumulator2 += value.longitude
                    }
                })
                return {
                    latitude: accumulator1 / NUM_RESERVATIONS,
                    longitude: accumulator2 / NUM_RESERVATIONS,
                }
            default:
                context.forEach(item => {
                    if (item.id_restaurant == restaurantId) {
                        const value = item[field] as number
                        accumulator1 += value
                    }
                })
                return accumulator1 / NUM_RESERVATIONS
        }
    }

    const centroid = avg('reservationLocation') as LatLng

    //TODO: this is not efficient because we have a number of for loops equal to the number of fields in the object
    // but since the reservations will not be so many, I think it's ok
    const avgContext: ReservationContext = {
        id_restaurant: restaurantId,
        n_people: avg('n_people') as number,
        reservationLocation: centroid,
        centroidDistance: averageFromCentroid(centroid, context),
        currentDay: avg('currentDay') as number,
        reservationDay: avg('reservationDay') as DAYS_WEEK,
        timeDistanceFromCurrent: avg('currentTime') as number,
        timeDistanceFromReservation: avg('reservationTime') as number,
    }
    return avgContext
}

const averageFromCentroid = (
    centroid: LatLng,
    context: ReservationContext[],
) => {
    let accumulator = 0
    context.forEach(item => {
        accumulator += distanceBetweenCoordinates(
            centroid,
            item.reservationLocation,
        )
    })
    return accumulator / context.length
}

const normalizeVector = (
    vector: ContextVector,
    inputMean?: number,
    inputStdDev?: number,
): {normalizedVector: ContextVector; mean: number; stdDev: number} => {
    const mean =
        inputMean ??
        vector.reduce((sum, value) => sum + value, 0) / vector.length
    const stdDev =
        inputStdDev ??
        Math.sqrt(
            vector.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
                vector.length,
        )

    const normalizedVector = vector.map(value => (value - mean) / stdDev)

    return {normalizedVector, mean, stdDev}
}

export const normalizeAverageAndInput = (
    avgVector: ContextVector,
    inputVector: ContextVector,
): {
    normalizedAvgVector: ContextVector
    normalizedInputVector: ContextVector
} => {
    const {
        normalizedVector: normalizedAvgVector,
        mean,
        stdDev,
    } = normalizeVector(avgVector)
    // Normalize the input vector with respect to the avgVector distribution.
    const {normalizedVector: normalizedInputVector} = normalizeVector(
        inputVector,
        mean,
        stdDev,
    )
    return {normalizedAvgVector, normalizedInputVector}
}

export const weightVector = (vector: ContextVector): ContextVector => {
    const WEIGHTS = {
        id_restaurant: 0,
        n_people: 8000,
        centroidDistance: (distance: number) => {
            if (distance < 0.001) {
                // Assign a high weight when distance is very close to 0
                return 10
            } else if (distance > 10000) {
                // Reduce weight when distance is very high
                return 1
            } else {
                // Linearly interpolate weight between 5 and 1 based on distance
                return 3 - (distance / 10000) * 2
            }
        },
        currentDay: 10000,
        reservationDay: 10000,
        timeDistanceFromCurrent: 1,
        timeDistanceFromReservation: 1,
    }

    const weightedVector: ContextVector = [
        vector[0] * WEIGHTS.id_restaurant,
        vector[1] * WEIGHTS.n_people,
        vector[2] * WEIGHTS.centroidDistance(vector[2]),
        vector[3] * WEIGHTS.currentDay,
        vector[4] * WEIGHTS.reservationDay,
        vector[5] * WEIGHTS.timeDistanceFromCurrent,
        vector[6] * WEIGHTS.timeDistanceFromReservation,
    ]
    return weightedVector
}
