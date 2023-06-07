import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantsNearby, loadTopRatedRestaurants, createUser, makeReservation, login, getReservations } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "60s", target: 50 },
		{ duration: "60s", target: 200 },
		{ duration: "480s", target: 200 },
		{ duration: "60s", target: 80 },
		{ duration: "60s", target: 80 },
		{ duration: "600s", target: 220 },
		{ duration: "30s", target: 20 },
		{ duration: "90s", target: 20 },
		{ duration: "60s", target: 270 },
		{ duration: "180s", target: 220 },
		{ duration: "30s", target: 10 },
		{ duration: "30s", target: 10 },
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
