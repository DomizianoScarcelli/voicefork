import {pastContexts} from '../service/context-data'
import {ContextVector, Context} from '../shared/types'

export const contextToVector = (context: Context): ContextVector => {
    const {
        id_user,
        id_restaurant,
        n_people,
        restaurantLocation,
        currentDay,
        reservationDay,
        currentTime,
        reservationTime,
    } = context

    const vector: ContextVector = [
        id_user,
        id_restaurant,
        n_people,
        restaurantLocation.latitude,
        restaurantLocation.longitude,
        currentDay,
        reservationDay,
    ]

    // Split the currentTime and reservationTime strings into hours and minutes
    const [currentHour, currentMinute] = currentTime.split(':').map(Number)
    const [reservationHour, reservationMinute] = reservationTime
        .split(':')
        .map(Number)

    // Add the hour and minute components to the vector
    vector.push(currentHour, currentMinute, reservationHour, reservationMinute)

    return vector
}

export const computeAverageVector = (
    restaurantId: number,
): ContextVector | null => {
    /**
     * Defines the weight to give to each element of the vector
     */
    const WEIGHTS = [5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1] //TODO: to be better defined

    const vectors = []

    for (let context of pastContexts) {
        if (context.id_restaurant == restaurantId) {
            const vectorContext = contextToVector(context)
            vectors.push(vectorContext)
        }
    }

    const numVectors = vectors.length

    if (numVectors == 0) return null

    const VECTOR_LENGTH = 11

    const sumVector: ContextVector = vectors.reduce((accumulator, vector) => {
        return vector.map((component, index) => accumulator[index] + component)
    }, new Array(VECTOR_LENGTH).fill(0))

    const avgVector: ContextVector = sumVector.map(
        (component, index) => (component * WEIGHTS[index]) / numVectors,
    )

    console.log(`Average vector for id ${restaurantId} is ${avgVector}`)
    return avgVector
}

export const calculateL2Distance = (
    vector1: ContextVector,
    vector2: ContextVector,
): number => {
    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same length')
    }

    const squaredDiffSum = vector1.reduce((accumulator, component, index) => {
        const diff = component - vector2[index]
        return accumulator + diff ** 2
    }, 0)

    const l2Distance = Math.sqrt(squaredDiffSum)
    return l2Distance
}
