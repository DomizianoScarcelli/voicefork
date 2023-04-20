import { LatLng } from "../shared/types"
import dotenv from "dotenv"
import axios, { AxiosResponse } from "axios"

dotenv.config()

const KEY = process.env.API_KEY

const addressToLatLng = async (address: string): Promise<LatLng> => {
	const url = `http://api.positionstack.com/v1/forward?access_key=${KEY}&query=${address}`
	const res: AxiosResponse = await axios.get(url)
	const latLngResult: LatLng = {
		latitude: res.data.data[0].latitude,
		longitude: res.data.data[0].longitude,
	}
	return latLngResult
}

const distanceBetweenCoordinates = (origin: LatLng, destination: LatLng): number => {
	const earthRadius = 6371000 // in meters
	const { latitude: lat1, longitude: lon1 } = origin
	const { latitude: lat2, longitude: lon2 } = destination
	const dLat = degToRad(lat2 - lat1)
	const dLon = degToRad(lon2 - lon1)
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = earthRadius * c
	return distance
}

const degToRad = (deg: number): number => {
	return deg * (Math.PI / 180)
}

export { addressToLatLng, distanceBetweenCoordinates }
