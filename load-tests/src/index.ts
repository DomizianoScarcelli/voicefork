import http from "k6/http"
import { check, sleep } from "k6"
import { searchRestaurant, loadRestaurantImages, loadRestaurantsNearby, loadTopRatedRestaurants, createUser, makeReservation, login, getReservations, getUserAvatar } from "./utils/pipeline"

export const options = {
	stages: [
		{ duration: "20s", target: 1 },
		{ duration: "50s", target: 2 },
		{ duration: "10", target: 0 },
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
