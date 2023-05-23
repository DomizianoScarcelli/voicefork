import axios from 'axios'
import {EMBEDDING_URL} from '../shared/urls'
import {RestaurantIdSearch, RestaurantSearchQuery} from '../shared/types'

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
    body: RestaurantSearchQuery[],
    fastSearch?: boolean,
): Promise<RestaurantIdSearch[]> => {
    const result = (
        await axios.get(
            `${EMBEDDING_URL}/batch-distance-query?query_name=${query}&fast_search=${
                fastSearch ?? false
            }`,
            {
                data: body,
            },
        )
    ).data
    return result
}
