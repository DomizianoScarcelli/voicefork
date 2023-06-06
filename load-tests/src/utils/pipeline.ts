import http from "k6/http"
import { check, sleep } from "k6"
import { RESERVATION_URL, RESTAURANT_URL, USER_URL } from "../shared/constants"
import { Randomizer } from "./Randomizer"
import MinioServiceRestaurants from "./minio/minio-service-restaurants"
import MinioServiceUsers from "./minio/minio-service-users"

const randomizer = new Randomizer()
const minioUsers = new MinioServiceUsers()
const minioRestaurants = new MinioServiceRestaurants()

export const loadRestaurantImages = (numImages: number) => {
	let imagesList: string[] = []
	for (let i = 0; i < numImages; i++) {
		const imageName = randomizer.getRandomRestaurantImageName()
		const image = minioRestaurants.getObject(imageName, 'images')
		//console.log(`data:image/jpeg;base64,${image}`)
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
		query: encodeURIComponent(randomizer.getRandomRestaurantName()),
		coordinates: randomizer.getRandomCoordinates(),
		maxDistance: 50000,
		fastSearch: false,
	}
	const { query, coordinates, maxDistance, fastSearch } = searchParams
	const { latitude, longitude } = coordinates
	const URL = `${RESTAURANT_URL}/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&fastSearch=${fastSearch}`
	const res = http.get(URL)

	check(res, { "status was 200": (r) => r.status == 200 })

	//Probability to make a reservation or not
	if (Math.random() > 0.5) {
		makeReservation()
	}
	sleep(1)
}

export const makeReservation = () => {
	//The user makes a reservation to a certain restaurant
	const body = {
		id_user: randomizer.getRandomInteger(10), //Get a random id from 1 to 100
        id_restaurant: randomizer.getRandomInteger(6000), //Get a random restaurant to make the reservation to
        dateTime: randomizer.getRandomDate(), //Get a random date from now to 10 days from now
        n_people: randomizer.getRandomInteger(30), //Get a random number of people
	}
	const URL = `${RESERVATION_URL}/create-reservation`
	const res = http.post(URL, JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
	})

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const createUser = () => {
	//A new user is created
	const body = {
		name: randomizer.getRandomName(),
        surname: randomizer.getRandomSurname(),
        email: randomizer.getRandomEmail(),
        password: 'test'
	}
	const URL = `${USER_URL}/create-user`
	const res = http.post(URL, JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
	})

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const login = () => {
	//A user tries to login
	const body = {
        email: randomizer.getRandomEmail(),
        password: randomizer.getRandomPassword()
	}
	const URL = `${USER_URL}/login`
	const res = http.post(URL, JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
	})

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const getReservations = () => {
	const searchParams = {
		id: randomizer.getRandomInteger(10)
	}
	getUserAvatar(searchParams.id)
	const URL = `${RESERVATION_URL}/find-user-reservations/${searchParams.id}`
	const res = http.get(URL)

	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}

export const getUserAvatar = (id: number) => {
	const imageName = 'avatar_'+id.toString()
	const image = minioUsers.getObject(imageName)
	//console.log(`data:image/jpeg;base64,${image}`)
}
