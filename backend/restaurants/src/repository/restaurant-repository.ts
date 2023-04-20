import { PrismaClient, Restaurant } from "@prisma/client"
const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class RestaurantRepository {
	async CreateRestaurant(name: string, address: string, city: string, latitude: number, longitude: number): Promise<Restaurant> {
		const restaurant = await prisma.restaurant.create({
			data: {
				name: name,
				address: address,
				city: city,
				latitude: latitude,
				longitude: longitude,
			},
		})
		return restaurant
	}

	async GetRestaurantById(id: number): Promise<Restaurant | null> {
		const restaurant = await prisma.restaurant.findUnique({
			where: {
				id: id,
			},
		})
		return restaurant
	}

	async GetAllRestaurants(): Promise<Restaurant[]> {
		const restaurants = await prisma.restaurant.findMany()
		return restaurants
	}

	async GetRestaurantByAddressName(name: string, number: number): Promise<Restaurant | null> {
		const address = await prisma.restaurant.findFirst({
			where: {
				address: {
					equals: name,
				},
			},
		})
		return address
	}

	async GetRestaurantsByCity(city: string): Promise<Restaurant[]> {
		const restaurants = await prisma.restaurant.findMany({
			where: {
				city: city,
			},
		})
		return restaurants
	}

	async DeleteRestaurant(id: number): Promise<Restaurant | null> {
		const restaurant = await prisma.restaurant.delete({
			where: {
				id: id,
			},
		})
		return restaurant
	}
}

export default RestaurantRepository
