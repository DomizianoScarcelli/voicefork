import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantImages, loadRestaurantsNearby, loadTopRatedRestaurants } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "20s", target: 50 },
		{ duration: "50s", target: 100 },
		{ duration: "10", target: 0 },
	],
}

export default function() {
	searchRestaurant()
	loadRestaurantsNearby()
	loadTopRatedRestaurants()
	loadRestaurantImages(40)
}
