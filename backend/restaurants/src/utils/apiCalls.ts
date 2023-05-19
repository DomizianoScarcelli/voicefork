import axios from 'axios'
import {EMBEDDING_URL} from '../shared/urls'

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
