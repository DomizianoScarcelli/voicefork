type LatLng = {
	latitude: number
	longitude: number
}

type FullRestaurant = {
	id: number
	name: string
	fullAddress: string
	latitude: number | null
	longitude: number | null
}

type DistanceResult = {
	name: string
	id: number
	distance: number
}
export { LatLng, FullRestaurant, DistanceResult }
