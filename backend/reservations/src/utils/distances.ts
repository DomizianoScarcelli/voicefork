import {ContextVector} from '../shared/types'
/**
 * Computes the L2 distance between two ContextVectors
 * @param vectorA The first vector
 * @param vectorB The second vector
 * @returns L2 Distance between the two vectors
 */
export const l2Distance = (
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
/**
 * Compute the cosine similarity between two vectors
 * @param vectorA The first vector
 * @param vectorB The second vector
 * @returns Cosine similarity between the two vectors
 */
export const cosineSimilarity = (
    vectorA: ContextVector,
    vectorB: ContextVector,
): number => {
    if (vectorA.length !== vectorB.length) {
        throw new Error('Vectors must have the same length')
    }

    const dotProduct = vectorA.reduce(
        (acc, val, i) => acc + val * vectorB[i],
        0,
    )
    const magnitudeA = Math.sqrt(
        vectorA.reduce((acc, val) => acc + val ** 2, 0),
    )
    const magnitudeB = Math.sqrt(
        vectorB.reduce((acc, val) => acc + val ** 2, 0),
    )

    return dotProduct / (magnitudeA * magnitudeB)
}
