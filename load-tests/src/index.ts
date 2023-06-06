import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantImages, loadRestaurantsNearby, loadTopRatedRestaurants, createUser, makeReservation, login, getReservations, getUserAvatar } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "10s", target: 50},
		{ duration: "60s", target: 250 },
		{ duration: "30s", target: 250 },
		{ duration: "30s", target: 50 },
		{ duration: "10s", target: 50 },
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
