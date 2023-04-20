import RestaurantRepository from "../repository/restaurant-repository"
import { LevenshteinDistance } from "../utils/similarityUtils"
import { addressToLatLng } from "../utils/localizationUtils"
import { Restaurant } from "@prisma/client"
import { DistanceResult } from "../shared/types"

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

	async GetAllRestaurants(): Promise<Restaurant[]> {
		const restaurants = await this.repository.GetAllRestaurants()
		return restaurants
	}

	async GetRestaurantBySimilarName(query: string): Promise<DistanceResult[]> {
		const allRestaurants = await this.repository.GetAllRestaurants()
		const distanceArr: DistanceResult[] = []
		allRestaurants?.forEach(({ id, name }: { id: number; name: string }) => {
			const element = {
				name: name,
				id: id,
				distance: LevenshteinDistance(query.toLowerCase(), name.toLowerCase()),
			}
			distanceArr.push(element)
		})
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
