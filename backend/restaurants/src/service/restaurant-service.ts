import RestaurantRepository from '../repository/restaurant-repository'
import {Restaurant} from '@prisma/client'
import {
    LatLng,
    RestaurantDistanceResult,
    RestaurantIdSearch,
    RestaurantSearchQuery,
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
        fastSearch?: boolean,
    ): Promise<RestaurantSearchResult[]> {
        let filteredRestaurants: RestaurantDistanceResult[] | Restaurant[]
        if (locationInfo != undefined) {
            //If the location is defined, then take only the restaurants inside of the radius
            const {coordinates, maxDistance} = locationInfo
            const {latitude, longitude} = coordinates
            filteredRestaurants =
                await this.repository.GetRestaurantsNearCoordinates(
                    latitude,
                    longitude,
                    maxDistance,
                )
        } else {
            //Otherwise take the first page of resturants (This doesn't make much sense and has to be avoided)
            //TODO: Replace with the possibility to specify the city otherwise
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

        //Create the RestaurantSerchQuery object
        const restaurantQuery: RestaurantSearchQuery[] =
            filteredRestaurants.map(element => ({
                restaurantName: element.restaurant.name,
                restaurantId: element.restaurant.id,
                embeddingName: element.restaurant.embeddingName,
                distance: element.distance,
            }))

        //Splits the list of objects in batches, in order to perform the api request to the embedding service faster
        const batches: RestaurantSearchQuery[][] = [[]]
        const BATCH_SIZE = 8000
        for (let i = 0; i < restaurantQuery.length; i += BATCH_SIZE) {
            const batch = restaurantQuery.slice(i, i + BATCH_SIZE)
            batches.push(batch)
        }

        //Perform the api request to the embedding services
        let searchResults: RestaurantIdSearch[] = []
        for (let batch of batches) {
            const partialSearchResults: RestaurantIdSearch[] =
                await batchGetDistanceBewteenRestaurantNames(
                    query,
                    batch,
                    fastSearch,
                )
            searchResults = searchResults.concat(partialSearchResults)
        }

        //Get the details of the restaurant from their ids
        const restaurantDetails = await this.repository.GetRestaurantsByIds(
            searchResults.map(item => item.restaurantId),
        )
        //Sorting by restaurant id (descending order, just like it happend in respository.GetRestaurantsByIds) in order to match the indexing for the elements both in restaurantDetails and in searchResult
        searchResults.sort((a, b) => (a.restaurantId < b.restaurantId ? 1 : -1))

        const searchResultsWithDetils: RestaurantSearchResult[] = []

        //This is possible only because both restaurantDetails and searchResult are ordered by descending ids.
        for (let i = 0; i < restaurantDetails.length; i++) {
            const {nameDistance, locationDistance, restaurantId} =
                searchResults[i]
            const restaurantWithDetails: RestaurantSearchResult = {
                restaurant: restaurantDetails[i],
                nameDistance,
                locationDistance,
            }
            searchResultsWithDetils.push(restaurantWithDetails)
        }
        searchResultsWithDetils.sort((a, b) =>
            a.nameDistance > b.nameDistance ? 1 : -1,
        )
        if (limit != undefined) {
            return searchResultsWithDetils.slice(0, limit)
        }
        return searchResultsWithDetils
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
