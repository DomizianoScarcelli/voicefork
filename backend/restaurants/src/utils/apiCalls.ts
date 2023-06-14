import axios from 'axios'
import {
    LatLng,
    RestaurantIdSearch,
    RestaurantSearchQuery,
} from '../shared/types'
require('dotenv').config()

export const getDistanceBetweenRestaurantNames = async (
    query: string,
    restaurantName: string,
    embeddingName: string,
): Promise<number> => {
    const {distance} = (
        await axios.get(
            `${process.env.EMBEDDINGS_URL}/distance-query?query_name=${query}&embedding_name=${embeddingName}&other_name=${restaurantName}`,
        )
    ).data
    return distance
}

export const batchGetDistanceBewteenRestaurantNames = async (
    query: string,
    body: RestaurantSearchQuery[],
    fastSearch?: boolean,
): Promise<RestaurantIdSearch[]> => {
    const result = (
        await axios.get(
            `${
                process.env.EMBEDDINGS_URL
            }/batch-distance-query?query_name=${query}&fast_search=${
                fastSearch ?? false
            }`,
            {
                data: body,
            },
        )
    ).data
    return result
}
