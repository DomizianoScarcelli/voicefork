import RestaurantRepository from "./restaurant-repository"

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
}

export default RestaurantService
