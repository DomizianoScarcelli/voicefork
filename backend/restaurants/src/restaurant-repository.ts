import { PrismaClient, Restaurant, Address } from "@prisma/client"
const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class RestaurantRepository {
	async CreateRestaurant(name: string, addressId: number): Promise<Restaurant> {
		const restaurant = await prisma.restaurant.create({
			data: {
				name: name,
				addressId: addressId,
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

	async CreateAddress(street: string, number: number, city: string, latitude: number, longitude: number): Promise<Address> {
		const address = await prisma.address.create({
			data: {
				street: street,
				number: number,
				city: city,
				latitude: latitude,
				longitude: longitude,
			},
		})
		return address
	}

	async GetAddressById(id: number): Promise<Address | null> {
		const address = await prisma.address.findUnique({
			where: {
				id: id,
			},
		})
		return address
	}

	async GetAddressByName(name: string, number: number): Promise<Address | null> {
		const address = await prisma.address.findFirst({
			where: {
				AND: [
					{
						street: {
							equals: name,
						},
					},
					{
						number: {
							equals: number,
						},
					},
				],
			},
		})
		return address
	}

	async GetAllAddresses(): Promise<Address[]> {
		const addresses = await prisma.address.findMany()
		return addresses
	}
}

export default RestaurantRepository
