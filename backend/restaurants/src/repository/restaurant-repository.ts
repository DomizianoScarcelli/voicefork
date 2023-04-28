import {PrismaClient, Restaurant} from '@prisma/client'
const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */

class RestaurantRepository {
    async CreateRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const result = await prisma.restaurant.create({
            data: restaurant,
        })
        return result
    }

    async GetRestaurantById(id: number): Promise<Restaurant | null> {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: id,
            },
        })
        return restaurant
    }

    async GetRestaurantsByIds(ids: number[]): Promise<Restaurant[]> {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        })
        return restaurants
    }

    async GetAllRestaurants(): Promise<Restaurant[]> {
        const restaurants = await prisma.restaurant.findMany()
        return restaurants
    }

    async GetRestaurantByAddressName(
        name: string,
        number: string,
    ): Promise<Restaurant | null> {
        const address = await prisma.restaurant.findFirst({
            where: {
                street: {
                    equals: name,
                },
                number: {
                    equals: number,
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
