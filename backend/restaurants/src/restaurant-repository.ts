import { PrismaClient, Restaurant } from "@prisma/client"
const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class RestaurantRepository {
	async CreateRestaurant(name: string, address: string): Promise<Restaurant> {
		const restaurant = await prisma.restaurant.create({
			data: {
				name: name,
				address: address,
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

	async GetAllRestaurants(): Promise<Restaurant[] | null> {
		const restaurants = await prisma.restaurant.findMany()
		return restaurants
	}
}

export default RestaurantRepository
