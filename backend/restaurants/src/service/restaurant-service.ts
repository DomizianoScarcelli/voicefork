import RestaurantRepository from "../repository/restaurant-repository"
import { LevenshteinDistance } from "../utils/similarityUtils"
import { addressToLatLng, distanceBetweenCoordinates } from "../utils/localizationUtils"
import { Restaurant } from "@prisma/client"
import { LatLng, RestaurantDistanceResult } from "../shared/types"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class RestaurantService {
	repository: RestaurantRepository

	constructor() {
		this.repository = new RestaurantRepository()
	}

	async CreateRestaurant(name: string, address: string, city: string) {
		//TODO: Handle the case in which city is not in the input
		const { latitude, longitude } = await addressToLatLng(`${address}, ${city}`)
		const newRestaurant = await this.repository.CreateRestaurant(name, address, city, latitude, longitude)
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

	async GetRestaurantsNearCoordinates(coordinates: LatLng, maxDistance: number, limit?: number): Promise<RestaurantDistanceResult[]> {
		let result: RestaurantDistanceResult[] = []
		const { latitude, longitude } = coordinates
		const restaurants = await this.repository.GetAllRestaurants()
		restaurants.forEach((restaurant) => {
			const destination: LatLng = { latitude: restaurant.latitude, longitude: restaurant.longitude }
			const distance = distanceBetweenCoordinates(destination, coordinates)
			if (distance <= maxDistance) {
				result.push({ restaurant: restaurant, distance: distance })
			}
		})
		result.sort((a, b) => (a.distance > b.distance ? 1 : -1))
		if (limit != null) {
			return result.slice(0, limit)
		}
		return result
	}

	async GetAllRestaurants(): Promise<Restaurant[]> {
		const restaurants = await this.repository.GetAllRestaurants()
		return restaurants
	}

	async GetRestaurantBySimilarName(query: string): Promise<RestaurantDistanceResult[]> {
		const allRestaurants = await this.repository.GetAllRestaurants()
		const distanceArr: RestaurantDistanceResult[] = []
		allRestaurants?.forEach((restaurant) => {
			const element = {
				restaurant: restaurant,
				distance: LevenshteinDistance(query.toLowerCase(), restaurant.name.toLowerCase()),
			}
			distanceArr.push(element)
		})
		distanceArr.sort((a, b) => (a.distance > b.distance ? 1 : -1))
		return distanceArr
	}

	async DeleteRestaurant(id: number): Promise<Restaurant | null> {
		const restaurant = await this.repository.GetRestaurantById(id)
		if (restaurant == null) return null

		const result = await this.repository.DeleteRestaurant(id)
		return result
	}
}

export default RestaurantService
