import RestaurantRepository from '../repository/restaurant-repository'
import {Restaurant} from '@prisma/client'
import {
    LatLng,
    RestaurantDistanceResult,
    RestaurantSearchResult,
} from '../shared/types'
import MinioService from './minio-service'
import {
    getDistanceBetweenRestaurantNames,
    batchGetDistanceBewteenRestaurantNames,
} from '../utils/apiCalls'

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class RestaurantService {
    repository: RestaurantRepository
    readonly RESULTS_PER_PAGE: number
    minioService: MinioService

    constructor() {
        this.repository = new RestaurantRepository()
        this.RESULTS_PER_PAGE = 20
        this.minioService = new MinioService()
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
        const {latitude, longitude} = coordinates
        let restaurants: RestaurantDistanceResult[] = []
        if (pageNumber == undefined) {
            restaurants = await this.repository.GetRestaurantsNearCoordinates(
                latitude,
                longitude,
                maxDistance,
            )
        } else {
            const entriesToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
            restaurants = await this.repository.GetRestaurantsNearCoordinates(
                latitude,
                longitude,
                maxDistance,
                entriesToSkip,
                this.RESULTS_PER_PAGE,
            )
        }

        restaurants.sort((a, b) =>
            (a.distance ?? 0) > (b.distance ?? 0) ? 1 : -1,
        )
        if (limit != null) {
            return restaurants.slice(0, limit)
        }
        return restaurants
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
        pageNumber: number,
        limit?: number,
        locationInfo?: {coordinates: LatLng; maxDistance: number},
    ): Promise<RestaurantSearchResult[]> {
        let filteredRestaurants: RestaurantDistanceResult[] | Restaurant[]
        if (locationInfo != undefined) {
            const {coordinates, maxDistance} = locationInfo
            const {latitude, longitude} = coordinates
            const entriesToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
            filteredRestaurants =
                await this.repository.GetRestaurantsNearCoordinates(
                    latitude,
                    longitude,
                    maxDistance,
                )
        } else {
            const entriesToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
            const restaurants = await this.repository.GetAllRestaurants(
                entriesToSkip,
                this.RESULTS_PER_PAGE,
            )
            filteredRestaurants = restaurants.map(element => ({
                restaurant: element,
                distance: undefined,
            }))
        }

        const batches: RestaurantDistanceResult[][] = [[]]
        const BATCH_SIZE = 1500
        for (let i = 0; i < filteredRestaurants.length; i += BATCH_SIZE) {
            const batch = filteredRestaurants.slice(i, i + BATCH_SIZE)
            batches.push(batch)
        }

        let searchResults: RestaurantSearchResult[] = []
        for (let batch of batches) {
            const partialSearchResults: RestaurantSearchResult[] =
                await batchGetDistanceBewteenRestaurantNames(query, batch)
            searchResults = searchResults.concat(partialSearchResults)
        }

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
        const {latitude, longitude} = coordinates
        let restaurants: RestaurantDistanceResult[] = []
        if (pageNumber == undefined) {
            restaurants = await this.repository.GetTopRatedRestaurants(
                parseFloat(minRating.toString()),
                latitude,
                longitude,
                maxDistance,
            )
        } else {
            const entriesToSkip = (pageNumber - 1) * this.RESULTS_PER_PAGE
            restaurants = await this.repository.GetTopRatedRestaurants(
                latitude,
                longitude,
                maxDistance,
                parseFloat(minRating.toString()),
                entriesToSkip,
                this.RESULTS_PER_PAGE,
            )
        }
        restaurants.sort((a, b) =>
            a.restaurant.avgRating < b.restaurant.avgRating ? 1 : -1,
        )
        if (limit != undefined) {
            return restaurants.slice(0, limit)
        }
        return restaurants
    }

    async DeleteRestaurant(id: number): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaurantById(id)
        if (restaurant == null) return null

        const result = await this.repository.DeleteRestaurant(id)
        return result
    }

    async GetRestaurantImage(imageName: string): Promise<string | undefined> {
        const image = await this.minioService.getImage(imageName)
        return image
    }

    async GetRestaurantEmbedding(id: number): Promise<number[]> {
        const embedding = await this.minioService.getEmbedding(
            `embedding_${id}`,
        )
        return embedding
    }

    async GetRestaurantsByCity(city: string): Promise<Restaurant[]> {
        if (city.toLowerCase() == 'rome') city = 'ome' //TODO: little workaround for now
        const results = await this.repository.GetRestaurantsByCity(
            city.toLowerCase(),
        )
        return results
    }
}

export default RestaurantService
