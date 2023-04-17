import RestaurantRepository from "../repository/restaurant-repository"
import { LevenshteinDistance } from "../utils/similarityUtils"
import { addressToLatLng } from "../utils/localizationUtils"
import { FullRestaurant } from "../shared/types"
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

	async CreateRestaurant(name: string, street: string, number: string, city: string) {
		//TODO: Handle the case in which city is not in the input
		let address = await this.repository.GetAddressByName(street, parseInt(number))
		if (address == null) {
			const { latitude, longitude } = await addressToLatLng(`${street}, ${number}, ${city}`)
			address = await this.repository.CreateAddress(street, parseInt(number), city, latitude, longitude)
		}
		const newRestaurant = await this.repository.CreateRestaurant(name, address.id)
		return newRestaurant
	}

	async GetRestaurantById(id: number, localize: boolean): Promise<FullRestaurant | Restaurant | null> {
		const restaurant = await this.repository.GetRestaurantById(id)
		if (restaurant == null) return null
		if (!localize) return restaurant

		const address = await this.GetAddressById(restaurant.addressId)
		if (address == null) return null
		const result: FullRestaurant = {
			id: restaurant.id,
			name: restaurant.name,
			fullAddress: `${address.street}, ${address.number}, ${address.city}`,
			latitude: address.latitude,
			longitude: address.longitude,
		}
		return result
	}

	async GetAllRestaurants(localize: boolean): Promise<FullRestaurant[] | Restaurant[]> {
		const restaurants = await this.repository.GetAllRestaurants()
		if (!localize) return restaurants
		let results = []

		for (let restaurant of restaurants) {
			const address = await this.GetAddressById(restaurant.addressId)
			if (address == null) continue
			const result: FullRestaurant = {
				id: restaurant.id,
				name: restaurant.name,
				fullAddress: `${address.street}, ${address.number}, ${address.city}`,
				latitude: address.latitude,
				longitude: address.longitude,
			}
			results.push(result)
		}
		return results
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

	async GetAddressById(id: number) {
		const result = await this.repository.GetAddressById(id)
		return result
	}

	async GetAddressByName(fullAddress: string) {
		const addressArr = fullAddress.split(",")
		const street = addressArr[0]
		const number = parseInt(addressArr[1])
		const result = await this.repository.GetAddressByName(street, number)
		return result
	}

	async GetAllAddresses() {
		const result = await this.repository.GetAllAddresses()
		return result
	}

	async DeleteRestaurant(id: number): Promise<Restaurant | null> {
		const restaurant = await this.repository.GetRestaurantById(id)
		if (restaurant == null) return null

		const result = await this.repository.DeleteRestaurant(id)
		return result
	}
}

export default RestaurantService
