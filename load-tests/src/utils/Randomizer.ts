import { LatLng } from "../shared/types"
import { coordinates } from "../data/coordinates"
import { restaurantNames } from "../data/restaurantsNames"
import { names } from "../data/names"
import { surnames } from "../data/surnames"
import { emails } from "../data/emails"

export class Randomizer {
	seed: number | undefined

	constructor(seed?: number) {
		this.seed = seed
	}

	private seededRandom = () => {
		if (this.seed) {
			let x = Math.sin(this.seed) * 10000
			return x - Math.floor(x)
		}
		return Math.random()
	}

	private randomChoice<T>(collection: T[]): T {
		const randomIndex = Math.floor(Math.random() * collection.length)
		return collection[randomIndex]
	}

	getRandomRestaurantName = (): string => {
		return this.randomChoice(restaurantNames)
	}

	getRandomCoordinates = (): LatLng => {
		return this.randomChoice(coordinates)
	}

	getRandomRestaurantImageName = (): string => {
		const MAX_NUM = 6000 //Amount of images in the bucket
		const index = Math.floor(this.seededRandom() * MAX_NUM)
		return `restaurant_image_${index}`
	}

	getRandomInteger = (max: number): number => {
		return Math.floor(Math.random() * max)
	}

	getRandomDate = () => {
		const startDate = new Date()
		startDate.setTime(startDate.getTime() - startDate.getTimezoneOffset()*60*1000)
		const endDate = startDate
		endDate.setDate(endDate.getDate() + 10)
		return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
	}

	getRandomName = (): string => {
		return this.randomChoice(names)
	}

	getRandomSurname = (): string => {
		return this.randomChoice(surnames)
	}

	generateRandomString(length: number) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let randomString = ''
		for (let i = 0; i < length; i++) {
		  const randomIndex = Math.floor(Math.random() * characters.length)
		  randomString += characters.charAt(randomIndex)
		}
		return randomString;
	}
	  
	generateRandomEmail() {
		const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com']
		const username = this.generateRandomString(8)
		const domain = domains[Math.floor(Math.random() * domains.length)]
		return `${username}@${domain}`
	}

	getRandomEmail() {
		return this.randomChoice(emails)
	}

	getRandomPassword() {
		if (Math.random() > 0.2) {return 'test'} //Password is test for everybody
		else {return this.generateRandomString(10)} //This is the case in which I type a wrong password
	}
}
