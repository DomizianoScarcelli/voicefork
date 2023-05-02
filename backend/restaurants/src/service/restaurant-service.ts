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
    readonly RESULTS_PER_PAGE: number

    constructor() {
        this.repository = new RestaurantRepository()
        this.RESULTS_PER_PAGE = 20
    }

    private filterRestaurantsByDistance(
        restaurants: Restaurant[],
        coordinates: LatLng,
        maxDistance: number,
    ): RestaurantDistanceResult[] {
        let nearbyRestaurants: RestaurantDistanceResult[] = []
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
                nearbyRestaurants.push({
                    restaurant: restaurant,
                    distance: distance,
                })
            }
        })
        return nearbyRestaurants
    }

    private paginateResults<T>(pageNumber: number, results: T[]): T[] {
        const itemsToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
        const finalIndex = itemsToSkip + this.RESULTS_PER_PAGE
        return results.slice(itemsToSkip, finalIndex)
    }

    async CreateRestaurant(restaurant: Restaurant) {
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
        pageNumber?: number,
    ): Promise<RestaurantDistanceResult[]> {
        const restaurants = await this.repository.GetAllRestaurants()
        let nearbyRestaurants = this.filterRestaurantsByDistance(
            restaurants,
            coordinates,
            maxDistance,
        )
        nearbyRestaurants.sort((a, b) =>
            (a.distance ?? 0) > (b.distance ?? 0) ? 1 : -1,
        )
        if (limit != null) {
            return nearbyRestaurants.slice(0, limit)
        }
        if (pageNumber != undefined)
            nearbyRestaurants = this.paginateResults<RestaurantDistanceResult>(
                pageNumber,
                nearbyRestaurants,
            )
        return nearbyRestaurants
    }

    async GetAllRestaurants(pageNumber?: number): Promise<Restaurant[]> {
        let restaurants: Restaurant[] = []
        if (pageNumber != undefined) {
            const entriesToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
            restaurants = await this.repository.GetAllRestaurants(
                entriesToSkip,
                this.RESULTS_PER_PAGE,
            )
        } else {
            restaurants = await this.repository.GetAllRestaurants()
        }
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

    async GetTopRatedRestaurants(
        coordinates: LatLng,
        maxDistance: number,
        minRating: number,
        limit?: number,
        pageNumber?: number,
    ): Promise<RestaurantDistanceResult[]> {
        const topRestaurants = await this.repository.GetTopRatedRestaurants(
            parseFloat(minRating.toString()),
        )
        let topNearbyRestaurants = this.filterRestaurantsByDistance(
            topRestaurants,
            coordinates,
            maxDistance,
        )
        topNearbyRestaurants.sort((a, b) =>
            a.restaurant.avgRating < b.restaurant.avgRating ? 1 : -1,
        )
        if (limit != undefined) {
            return topNearbyRestaurants.slice(0, limit)
        }
        if (pageNumber != undefined)
            topNearbyRestaurants =
                this.paginateResults<RestaurantDistanceResult>(
                    pageNumber,
                    topNearbyRestaurants,
                )
        return topNearbyRestaurants
    }

    async DeleteRestaurant(id: number): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaurantById(id)
        if (restaurant == null) return null

        const result = await this.repository.DeleteRestaurant(id)
        return result
    }
}

export default RestaurantService
