import http from "k6/http"
import { check, sleep } from "k6"
import { RESTAURANT_URL } from "../shared/constants"
import { Randomizer } from "./Randomizer"

const randomizer = new Randomizer()

export const loadRestaurantImages = (numImages: number) => {
	//TODO: make the call directly to te bucket and not to the API
	let imagesList: string[] = []
	for (let i = 0; i < numImages; i++) {
		const imageName = randomizer.getRandomRestaurantImageName()
		const URL = `${RESTAURANT_URL}/restaurant-image?imageName=${imageName}`
		http.get(URL)
	}
}

export const loadRestaurantsNearby = () => {
	const params = {
		coordinates: randomizer.getRandomCoordinates(),
		maxDistance: 10000,
		limit: 10,
	}
	const { coordinates, limit, maxDistance } = params
	const { latitude, longitude } = coordinates
	const URL = `${RESTAURANT_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&limit=${limit}&maxDistance=${maxDistance}`
	const res = http.get(URL)

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const loadTopRatedRestaurants = () => {
	const params = {
		coordinates: randomizer.getRandomCoordinates(),
		minRating: 4,
		maxDistance: 10000,
		limit: 10,
	}
	const { coordinates, limit, maxDistance, minRating } = params
	const { latitude, longitude } = coordinates
	const URL = `${RESTAURANT_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&limit=${limit}&minRating=${minRating}&maxDistance=${maxDistance}`
	const res = http.get(URL)

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const searchRestaurant = () => {
	//The user make a search request for a certain restaurant
	const searchParams = {
		query: randomizer.getRandomRestaurantName(),
		coordinates: randomizer.getRandomCoordinates(),
		maxDistance: 50000,
		fastSearch: false,
	}
	const { query, coordinates, maxDistance, fastSearch } = searchParams
	const { latitude, longitude } = coordinates
	const URL = `${RESTAURANT_URL}/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&fastSearch=${fastSearch}`
	const res = http.get(URL)

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}
