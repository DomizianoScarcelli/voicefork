import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantsNearby, loadTopRatedRestaurants, createUser, makeReservation, login, getReservations } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "60s", target: 20 },
		{ duration: "120s", target: 100 },
		{ duration: "480s", target: 300 },
		{ duration: "60s", target: 30 },
		{ duration: "600s", target: 400 },
		{ duration: "30s", target: 300 },
		{ duration: "90s", target: 100 },
		{ duration: "60s", target: 10 },
		{ duration: "180s", target: 250 },
		{ duration: "100", target: 20 },
		{ duration: "100s", target: 5 },
	],
}

export function init() {}

export function start() {}

export default function() {
	login()
	createUser()
	searchRestaurant()
	loadRestaurantsNearby()
	loadTopRatedRestaurants()
	// loadRestaurantImages(40)
	makeReservation()
	getReservations()
}
