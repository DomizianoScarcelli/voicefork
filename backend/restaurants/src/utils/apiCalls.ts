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

export const getGeoZoneFromLatLng = async (
    coordinates: LatLng,
): Promise<string> => {
    const {latitude, longitude} = coordinates
    const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

    try {
        const response = await axios.get(URL)
        const data = response.data
        const address = data.address
        switch (true) {
            case Boolean(address.quarter):
                if (address.quarter.includes('Municipio'))
                    console.log('quarter: ', address.quarter)
                return address.quarter
            case Boolean(address.highway):
                if (address.highway.includes('Municipio'))
                    console.log('highway: ', address.highway)
                return address.highway
            case Boolean(address.village):
                if (address.village.includes('Municipio'))
                    console.log('village: ', address.quvillagearter)
                return address.village
            case Boolean(address.neighbourhood):
                if (address.neighbourhood.includes('Municipio'))
                    console.log('neighbourhood: ', address.neighbourhood)
                return address.neighbourhood

            case Boolean(address.town):
                if (address.town.includes('Municipio'))
                    console.log('town: ', address.town)
                return address.town
            case Boolean(address.hamlet):
                if (address.hamlet.includes('Municipio'))
                    console.log('hamlet: ', address.hamlet)
                return address.hamlet

            case Boolean(address.railway):
                if (address.railway.includes('Municipio'))
                    console.log('railway: ', address.railway)
                return address.hamlet
            case Boolean(address.suburb):
                if (address.suburb.includes('Municipio')) {
                    console.log('suburb: ', address.suburb)
                    console.log(address)
                } else {
                    return address.suburb
                }
            case Boolean(address.road):
                if (address.road.includes('Municipio')) {
                    console.log('road: ', address.road)
                } else {
                    return address.road
                }
            default:
                return ''
        }
    } catch (error: any) {
        console.error('API Error:', error)
        // Check if the error is due to rate limiting
        if (error.response && error.response.status === 429) {
            const retryAfterSeconds =
                parseInt(error.response.headers['retry-after'], 10) || 10 // Default delay of 10 seconds
            console.log(
                `Rate limit exceeded. Retrying after ${retryAfterSeconds} seconds...`,
            )
            await delay(retryAfterSeconds * 1000) // Convert seconds to milliseconds
            return getGeoZoneFromLatLng(coordinates) // Retry the request recursively
        }
        // Handle other errors
        throw error
    }
}

// Utility function to introduce a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
