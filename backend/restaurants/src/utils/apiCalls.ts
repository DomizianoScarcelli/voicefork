import axios from 'axios'
import {EMBEDDING_URL} from '../shared/urls'
import {RestaurantDistanceResult, RestaurantSearchResult} from '../shared/types'
import {data} from '@tensorflow/tfjs'

export const getDistanceBetweenRestaurantNames = async (
    query: string,
    restaurantName: string,
    embeddingName: string,
): Promise<number> => {
    const {distance} = (
        await axios.get(
            `${EMBEDDING_URL}/distance-query?query_name=${query}&embedding_name=${embeddingName}&other_name=${restaurantName}`,
        )
    ).data
    return distance
}

export const batchGetDistanceBewteenRestaurantNames = async (
    query: string,
    body: RestaurantDistanceResult[],
): Promise<RestaurantSearchResult[]> => {
    const result = (
        await axios.get(
            `${EMBEDDING_URL}/batch-distance-query?query_name=${query}`,
            {
                data: body,
            },
        )
    ).data
    return result
}
