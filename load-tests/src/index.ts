import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantImages, loadRestaurantsNearby, loadTopRatedRestaurants, createUser, makeReservation, login, getReservations, getUserAvatar } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "60s", target: 50},
		{ duration: "60s", target: 250 },
		{ duration: "480s", target: 250 },
		{ duration: "60s", target: 80 },
		{ duration: "60s", target: 80 },
		{ duration: "600s", target: 270 },
		{ duration: "30s", target: 20 },
		{ duration: "90s", target: 20 },
		{ duration: "60s", target: 270 },
		{ duration: "180s", target: 270 },
		{ duration: "30s", target: 10 },
		{ duration: "30s", target: 10 },
	],
}

export function init() {
	
}

export function start() {
	
}

export default function() {
	login()
	createUser()
	searchRestaurant()
	loadRestaurantsNearby()
	loadTopRatedRestaurants()
	loadRestaurantImages(40)
	makeReservation()
	getReservations()
}
