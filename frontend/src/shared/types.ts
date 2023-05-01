import {
    CuisineTile,
    RestaurantTile,
} from '../components/HorizontalScrollingSection/HorizontalScrollingSection'

export type Restaurant = {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
    country: string
    region: string
    province: string
    city: string
    tags: string
    cuisines: string
    specialDiets: string
    priceLevel: string
    meals: string
    avgRating: number
    vegetarianFriendly: boolean
    veganFriendly: boolean
    glutenFree: boolean
    reviewsNumber: number
}

export type DistanceResult = {
    distance: number
    restaurant: Restaurant
}

export type LatLng = {
    latitude: number
    longitude: number
}
