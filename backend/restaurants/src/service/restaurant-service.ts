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
import {batchGetDistanceBewteenRestaurantNames} from '../utils/apiCalls'
import levenshtein from 'damerau-levenshtein'
import axios from 'axios'
import {distanceBetweenCoordinates} from '../utils/localizationUtils'
require('dotenv').config()

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
const REMOVABLE_WORDS = [
    'ristorante',
    'pizzeria',
    'bisteccheria',
    'trattoria',
    'gelateria',
]

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

    async CreateRestaurantBatch(restaurantBatch: Restaurant[]) {
        const result = await this.repository.CreateRestaurantBatch(
            restaurantBatch,
        )
        return result
    }

    async GetRestaurantById(id: number): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaurantById(id)
        return restaurant
    }

    async GetRestaurantsByIds(ids: number[]): Promise<Restaurant[]> {
        const restaurants = await this.repository.GetRestaurantsByIds(ids)
        return restaurants
    }

    async GetRestaurantByEmbeddingName(
        embeddingName: string,
    ): Promise<Restaurant | null> {
        const restaurant = await this.repository.GetRestaruantByEmbeddingName(
            embeddingName,
        )
        return restaurant
    }

    private orderRestaruantByLevenshteinDistance(
        query: string,
        restaurantList: RestaurantDistanceResult[],
    ): RestaurantSearchResult[] {
        let searchResults: RestaurantSearchResult[] = []

        restaurantList.forEach(({restaurant, distance}) => {
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

        return searchResults
    }

    private async orderRestaurantByEmbeddingDistance(
        query: string,
        restaurantList: RestaurantDistanceResult[],
    ): Promise<RestaurantSearchResult[]> {
        //Create the RestaurantSerchQuery object
        const restaurantQuery: RestaurantSearchQuery[] = restaurantList.map(
            element => ({
                restaurantName: element.restaurant.name,
                restaurantId: element.restaurant.id,
                embeddingName: element.restaurant.embeddingName,
                distance: element.distance,
            }),
        )

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
                await batchGetDistanceBewteenRestaurantNames(query, batch)
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
            const {nameDistance, locationDistance} = searchResults[i]
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

        return searchResultsWithDetils
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
        city?: string,
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
        } else if (city != undefined) {
            //Otherwise search the restaurants by city
            const restaurants = await this.GetRestaurantsByCity(city)
            filteredRestaurants = restaurants.map(element => ({
                restaurant: element,
                distance: -1,
            }))
        } else {
            // Throw an error in case location information is not specified
            throw Error(
                "You have to specify either the 'city' field or the 'latitude' and 'longitude' fields",
            )
        }

        let searchResult: RestaurantSearchResult[] = []
        if (fastSearch) {
            //Don't contact embedding service for a faster but less accurate research
            searchResult = this.orderRestaruantByLevenshteinDistance(
                query,
                filteredRestaurants,
            )
        } else {
            //Call the embeddings service for a slower but accurate search
            searchResult = await this.orderRestaurantByEmbeddingDistance(
                query,
                filteredRestaurants,
            )
        }

        if (limit != undefined) {
            return searchResult.slice(0, limit)
        }
        return searchResult
    }

    /**
     * Makes the average betweenthe faissDistance and the levenshtein distance computed between the clean query and the clean restaurant name,
     * where clean means the string without the REMOVABLE_WORDS (ristorante, pizzeria, trattoria, gelateria etc.)
     */
    private avgLevenshtein(
        faissDistance: number,
        query: string,
        restaurantName: string,
    ) {
        const cleanQuery: string = query
            .toLowerCase()
            .split(' ')
            .filter(word => !REMOVABLE_WORDS.includes(word.toLowerCase()))
            .join(' ')

        const cleanRestaurantName: string = restaurantName
            .toLowerCase()
            .split(' ')
            .filter(word => !REMOVABLE_WORDS.includes(word.toLowerCase()))
            .join(' ')
        let similarities: number[] = []

        const {similarity} = levenshtein(cleanQuery, cleanRestaurantName)
        similarities.push(similarity)

        const distance = 1 - similarity
        return faissDistance * 0.5 + distance * 0.5
    }

    async SearchRestaurantFaiss(
        query: string,
        limit?: number,
        locationInfo?: {coordinates: LatLng; maxDistance: number},
        city?: string,
    ): Promise<RestaurantSearchResult[]> {
        type FaissResponse = {
            embeddingName: string
            nameDistance: string
        }

        const data: FaissResponse[] = (
            await axios.get(
                `http://${process.env.EMBEDDINGS_URL}/faiss-distance-query?query_name=${query}&limit=${limit}`,
            )
        ).data
        let results: RestaurantSearchResult[] = []
        let restaurants = await this.GetRestaurantsByEmbeddingName(
            data.map(data => data.embeddingName),
        )
        if (locationInfo) {
            const {coordinates, maxDistance} = locationInfo

            for (let i = 0; i < data.length; i++) {
                const {nameDistance} = data[i]
                const restaurant = restaurants[i]
                const restaurantCoordinates = {
                    latitude: restaurant!.latitude,
                    longitude: restaurant!.longitude,
                }

                const locationDistance = distanceBetweenCoordinates(
                    coordinates,
                    restaurantCoordinates,
                )

                if (locationDistance < maxDistance) {
                    results.push({
                        restaurant: restaurant!,
                        locationDistance,
                        nameDistance: this.avgLevenshtein(
                            parseFloat(nameDistance),
                            query,
                            restaurant!.name,
                        ),
                    })
                }
            }
        } else if (city) {
            for (let i = 0; i < data.length; i++) {
                const {nameDistance} = data[i]
                const restaurant = restaurants[i]

                if (city.toLowerCase() == 'rome') city = 'ome'

                if (restaurant!.city == city) {
                    results.push({
                        restaurant: restaurant!,
                        locationDistance: -1,
                        nameDistance: this.avgLevenshtein(
                            parseFloat(nameDistance),
                            query,
                            restaurant!.name,
                        ),
                    })
                }
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                const {nameDistance} = data[i]
                const restaurant = restaurants[i]

                results.push({
                    restaurant: restaurant!,
                    locationDistance: -1,
                    nameDistance: this.avgLevenshtein(
                        parseFloat(nameDistance),
                        query,
                        restaurant!.name,
                    ),
                })
            }
        }
        results.sort((a, b) => (a.nameDistance > b.nameDistance ? 1 : -1))
        return results
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
        const results = await this.repository.GetRestaurantsByCity(city)
        return results
    }

    async GetRestaurantsByEmbeddingName(
        embeddingNames: string[],
    ): Promise<Restaurant[]> {
        const startTime = process.hrtime() // Start measuring time

        const restaurants = await this.repository.GetRestaruantsByEmbeddingName(
            embeddingNames,
        )

        const restaurantMap = new Map<string, Restaurant>()
        for (const restaurant of restaurants) {
            restaurantMap.set(restaurant.embeddingName, restaurant)
        }

        const orderedRestaurants: Restaurant[] = []
        for (const embeddingName of embeddingNames) {
            const restaurant = restaurantMap.get(embeddingName)
            if (restaurant) {
                orderedRestaurants.push(restaurant)
            }
        }

        const endTime = process.hrtime(startTime) // Stop measuring time
        const executionTime = endTime[0] * 1000 + endTime[1] / 1e6 // Convert to milliseconds

        console.log(
            `Execution time: ${executionTime} milliseconds for ${embeddingNames.length} restaurants`,
        )

        return orderedRestaurants
    }
}

export default RestaurantService
