import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantImages, loadRestaurantsNearby, loadTopRatedRestaurants } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "10s", target: 5 },
		{ duration: "20s", target: 12 },
		{ duration: "10", target: 0 },
	],
}

export default function() {
	searchRestaurant()
	loadRestaurantsNearby()
	loadTopRatedRestaurants()
	// loadRestaurantImages(40)
}
