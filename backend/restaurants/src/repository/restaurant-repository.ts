import {PrismaClient, Restaurant} from '@prisma/client'
import {RestaurantDistanceResult} from '../shared/types'
const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */

class RestaurantRepository {
    private async getNearbyRestaurantsIds(
        latitude: number,
        longitude: number,
        maxDistance: number,
    ) {
        const restaurants = await prisma.$queryRaw<
            {id: number; distance_meters: number}[]
        >`
    SELECT
      id,
      ST_Distance(
        ST_MakePoint(longitude, latitude)::geography,
        ST_MakePoint(${parseFloat(longitude.toString())}, ${parseFloat(
            latitude.toString(),
        )})::geography
      ) AS distance_meters
    FROM "Restaurant"
    WHERE ST_DWithin(
      ST_MakePoint(longitude, latitude)::geography,
      ST_MakePoint(${parseFloat(longitude.toString())}, ${parseFloat(
            latitude.toString(),
        )})::geography,
      ${parseFloat(maxDistance.toString())}
    )
  `
        return restaurants
    }

    async CreateRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        const result = await prisma.restaurant.create({
            data: restaurant,
        })
        return result
    }

    async CreateRestaurantBatch(restaurants: Restaurant[]): Promise<any> {
        const result = await prisma.restaurant.createMany({
            data: restaurants,
            skipDuplicates: true,
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
            orderBy: {id: 'desc'},
        })
        return restaurants
    }

    async GetRestaurantsNearCoordinates(
        latitude: number,
        longitude: number,
        maxDistance: number,
        skip?: number,
        take?: number,
    ): Promise<RestaurantDistanceResult[]> {
        const restaurants = await this.getNearbyRestaurantsIds(
            latitude,
            longitude,
            maxDistance,
        )
        const restaurantInfo = await prisma.restaurant.findMany({
            where: {
                id: {
                    in: restaurants.map(({id}: {id: number}) => id),
                },
            },
            skip: skip,
            take: take,
        })

        const result = restaurantInfo.map(restaurant => {
            const distance = restaurants.find(
                r => r.id === restaurant.id,
            )?.distance_meters

            return {
                restaurant,
                distance,
            }
        })

        return result
    }

    async GetAllRestaurants(
        skip?: number,
        take?: number,
    ): Promise<Restaurant[]> {
        const restaurants = await prisma.restaurant.findMany({
            skip: skip,
            take: take,
        })
        return restaurants
    }

    async GetTopRatedRestaurants(
        threshold: number,
        latitude: number,
        longitude: number,
        maxDistance: number,
        skip?: number,
        take?: number,
    ): Promise<RestaurantDistanceResult[]> {
        let restaurantInfo: Restaurant[] = []

        const restaurants = await this.getNearbyRestaurantsIds(
            latitude,
            longitude,
            maxDistance,
        )
        restaurantInfo = await prisma.restaurant.findMany({
            where: {
                AND: [
                    {
                        avgRating: {
                            gte: threshold,
                        },
                    },
                    {
                        id: {
                            in: restaurants.map(({id}: {id: number}) => id),
                        },
                    },
                ],
            },
            skip: skip,
            take: take,
        })

        const result = restaurantInfo.map(restaurant => {
            const distance = restaurants.find(
                r => r.id === restaurant.id,
            )?.distance_meters

            return {
                restaurant,
                distance,
            }
        })
        return result
    }

    async GetRestaurantByAddressName(
        address: string,
    ): Promise<Restaurant | null> {
        const result = await prisma.restaurant.findFirst({
            where: {
                address: {
                    equals: address,
                },
            },
        })
        return result
    }

    async GetRestaurantsByCity(city: string): Promise<Restaurant[]> {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                city: city.toLowerCase(),
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

    async GetRestaruantByEmbeddingName(
        embeddingName: string,
    ): Promise<Restaurant | null> {
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                embeddingName: embeddingName,
            },
        })
        return restaurant
    }
}

export default RestaurantRepository
