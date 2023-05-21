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
/***
 * Computes the average ReservationContext object for all reservations with the same restaurantId.
 * @param restaurantId The restaurant ID to consider
 * @param context the list of ReservationContext that has to be considered
 */
export const computeAverageContext = (
    restaurantId: number,
    context: ReservationContext[],
): ReservationContext => {
    /**
     * (Inner function in order to get the same restaurantId and context without passing them)
     *
     * It returns the average over the indicated feild, for all the reservations with the indicated restaurantId
     * @param field The field over which to take the average
     */
    const avg = (
        field: keyof ReservationContext,
    ): number | LatLng | TimeFormat => {
        let sum = 0

        const NUM_RESERVATIONS = context.length

        switch (field) {
            case 'reservationTime':
            case 'currentTime':
                sum = context.reduce((acc, item) => {
                    if (item.id_restaurant == restaurantId) {
                        const value = item[field] as TimeFormat
                        const secondFromMidnight =
                            timeToSecondsFromMidnight(value)
                        return acc + secondFromMidnight
                    }
                    return acc
                }, 0)
                return sum / NUM_RESERVATIONS

            case 'reservationLocation':
                const {latitude, longitude} = context.reduce(
                    (acc, item) => {
                        if (item.id_restaurant == restaurantId) {
                            const value = item[field] as LatLng
                            return {
                                latitude: acc.latitude + value.latitude,
                                longitude: acc.longitude + value.longitude,
                            }
                        }
                        return acc
                    },
                    {latitude: 0, longitude: 0},
                )
                return {
                    latitude: latitude / NUM_RESERVATIONS,
                    longitude: longitude / NUM_RESERVATIONS,
                }

            default:
                sum = context.reduce((acc, item) => {
                    if (item.id_restaurant == restaurantId) {
                        const value = item[field] as number
                        return acc + value
                    }
                    return acc
                }, 0)
                return sum / NUM_RESERVATIONS
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

/**
 * Given a centroid and a context array, it computes the average distance from the centroid with respect to all the elements in the context array
 *
 * @param centroid The centroid, expressed in latitude and longitude
 * @param context  The context array over which to compute the average
 * @returns
 */
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

/**
 * Normalize the vector using z-score normalization according to its means and standard deviation, or to a given mean and standard deviation
 *
 * @param vector The vector that has to be normalized
 * @param inputMean The mean for the z-score, if not inserted it will compute the mean of the vector
 * @param inputStdDev The standard deviation for the z-score, if not inserted it will compute the standard deviation of the vector
 * @returns The vector normalized according to z-score normalization
 */
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

/**
 * Batch normalizes the avgVector with its mean and stddev, and the inputVector with the avgVector's mean and stddev,
 * in order for the normalization to be on the same more general distribution
 * @param avgVector The average context vector
 * @param inputVector The input vector
 * @returns Both vector normalized
 */
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

/**
 * Weights the vector with respect to the weights (fixed inside of the function definition)
 * @param vector The vector that has to be weightes
 * @returns The weighted vector
 */
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
