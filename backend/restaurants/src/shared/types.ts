import {Restaurant} from '@prisma/client'

type LatLng = {
    latitude: number
    longitude: number
}

type RestaurantDistanceResult = {
    restaurant: Restaurant
    distance?: number
}

type RestaurantSearchResult = {
    restaurant: Restaurant
    nameDistance: number
    locationDistance?: number
}

export {LatLng, RestaurantDistanceResult, RestaurantSearchResult}
