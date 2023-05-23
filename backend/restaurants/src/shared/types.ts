import {Restaurant} from '@prisma/client'

export type LatLng = {
    latitude: number
    longitude: number
}

export type RestaurantDistanceResult = {
    restaurant: Restaurant
    distance?: number
}

export type RestaurantSearchQuery = {
    restaurantName: string
    restaurantId: number
    embeddingName: string
    distance?: number
}
export type RestaurantSearchResult = {
    restaurant: Restaurant
    nameDistance: number
    locationDistance?: number
}

export type RestaurantIdSearch = {
    restaurantId: number
    nameDistance: number
    locationDistance?: number
}
