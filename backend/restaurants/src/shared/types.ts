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
export { LatLng, FullRestaurant }
