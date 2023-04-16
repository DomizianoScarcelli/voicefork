import RestaurantRepository from "./restaurant-repository"
import { LevenshteinDistance } from "./utils/similarityUtils"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class RestaurantService {
	repository: RestaurantRepository

	constructor() {
		this.repository = new RestaurantRepository()
	}

	async CreateRestaurant(name: string, address: string) {
		const newRestaurant = await this.repository.CreateRestaurant(name, address)
		return newRestaurant
	}

	async GetRestaurantById(id: number) {
		const result = await this.repository.GetRestaurantById(id)
		return result
	}

	async GetAllRestaurants() {
		const result = await this.repository.GetAllRestaurants()
		return result
	}

	async GetRestaurantBySimilarName(query: string) {
		const allRestaurants = await this.repository.GetAllRestaurants()
		const distanceMap = new Map()
		allRestaurants?.forEach(({ id, name }: { id: number; name: string }) => {
			distanceMap.set(id, LevenshteinDistance(query.toLowerCase(), name.toLowerCase()))
		})
		return Object.fromEntries(distanceMap)
	}
}

export default RestaurantService
