import { LatLng } from "../shared/types.js"
import { coordinates } from "../data/coordinates.js"
import { restaurantNames } from "../data/restaurantsNames.js"

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
		const randomIndex = Math.random() * collection.length
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
		const index = this.seededRandom() * MAX_NUM
		return `restaurant_image_${index}`
	}
}
