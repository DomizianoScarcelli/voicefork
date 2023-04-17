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

export { addressToLatLng }
