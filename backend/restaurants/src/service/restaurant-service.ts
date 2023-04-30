import RestaurantRepository from '../repository/restaurant-repository'
import levenshtein from 'damerau-levenshtein'
import {
    addressToLatLng,
    distanceBetweenCoordinates,
} from '../utils/localizationUtils'
import {Restaurant} from '@prisma/client'
import {
    LatLng,
    RestaurantDistanceResult,
    RestaurantSearchResult,
} from '../shared/types'

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class RestaurantService {
    repository: RestaurantRepository

    constructor() {
        this.repository = new RestaurantRepository()
    }

    async CreateRestaurant(restaurant: Restaurant) {
        // const {latitude, longitude} = await addressToLatLng(
        //     `${address}, ${city}`,
        // )
        const newRestaurant = await this.repository.CreateRestaurant(restaurant)
        return newRestaurant
    }

    async GetRestaurantById(id: number): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaurantById(id)
        return restaurant
    }

    async GetRestaurantsByIds(ids: number[]): Promise<Restaurant[]> {
        const restaurants = await this.repository.GetRestaurantsByIds(ids)
        return restaurants
    }

    async GetRestaurantsNearCoordinates(
        coordinates: LatLng,
        maxDistance: number,
        limit?: number,
    ): Promise<RestaurantDistanceResult[]> {
        let result: RestaurantDistanceResult[] = []
        const restaurants = await this.repository.GetAllRestaurants()
        restaurants.forEach(restaurant => {
            const destination: LatLng = {
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
            }
            const distance = distanceBetweenCoordinates(
                destination,
                coordinates,
            )
            if (distance <= maxDistance) {
                result.push({restaurant: restaurant, distance: distance})
            }
        })
        result.sort((a, b) => ((a.distance ?? 0) > (b.distance ?? 0) ? 1 : -1))
        if (limit != null) {
            return result.slice(0, limit)
        }
        return result
    }

    async GetAllRestaurants(): Promise<Restaurant[]> {
        const restaurants = await this.repository.GetAllRestaurants()
        return restaurants
    }

    async SearchRestaurants(
        query: string,
        limit?: number,
        locationInfo?: {coordinates: LatLng; maxDistance: number},
    ): Promise<RestaurantSearchResult[]> {
        let filteredRestaurants: RestaurantDistanceResult[]
        if (locationInfo != undefined) {
            const {coordinates, maxDistance} = locationInfo
            filteredRestaurants = await this.GetRestaurantsNearCoordinates(
                coordinates,
                maxDistance,
                limit,
            )
        } else {
            const allRestaurants = await this.repository.GetAllRestaurants()
            filteredRestaurants = allRestaurants.map(element => ({
                restaurant: element,
                distance: undefined,
            }))
        }
        const searchResults: RestaurantSearchResult[] = []
        filteredRestaurants?.forEach(({restaurant, distance}) => {
            const {similarity} = levenshtein(
                query.toLowerCase(),
                restaurant.name.toLowerCase(),
            )
            const element: RestaurantSearchResult = {
                restaurant: restaurant,
                nameDistance: 1 - similarity,
                locationDistance: distance,
            }
            searchResults.push(element)
        })
        searchResults.sort((a, b) => (a.nameDistance > b.nameDistance ? 1 : -1))
        if (limit != undefined) {
            return searchResults.slice(0, limit)
        }
        return searchResults
    }

    async DeleteRestaurant(id: number): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaurantById(id)
        if (restaurant == null) return null

        const result = await this.repository.DeleteRestaurant(id)
        return result
    }
}

export default RestaurantService
