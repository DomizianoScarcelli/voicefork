import { Restaurant } from "@prisma/client"

type LatLng = {
	latitude: number
	longitude: number
}

type RestaurantDistanceResult = {
	restaurant: Restaurant
	distance: number
}

export { LatLng, RestaurantDistanceResult }
