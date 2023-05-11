import {LatLng, DistanceResult, Reservation} from '../shared/types'
import { Urls } from '../constants'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Alert } from 'react-native'

export const performSearch = async (
    query: string,
    coordinates: LatLng | undefined,
) => {
    if (coordinates == undefined) return []
    console.log('Searching for restaurants')
    const MAX_DISTANCE = 100000
    const LIMIT = 50
    const {latitude, longitude} = coordinates
    const URL = `${Urls.restaurant}/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
    const data = (await axios.get(URL)).data
    return data
}

export const getNearbyRestaurants = async (coordinates: LatLng | undefined) => {
    if (coordinates == undefined) return []
    const {latitude, longitude} = coordinates
    console.log('Getting nearby restaurants')
    const MAX_DISTANCE = 3000
    const LIMIT = 10
    const URL = `${Urls.restaurant}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
    const result: DistanceResult[] = (await axios.get(URL)).data
    return result
}

export const getTopRatedRestaurants = async (
    coordinates: LatLng | undefined,
) => {
    console.log('Getting top picks restaurants')
    if (coordinates == undefined) return []
    const {latitude, longitude} = coordinates
    const MAX_DISTANCE = 3000
    const LIMIT = 10
    const MIN_RATING = 4.0
    const URL = `${Urls.restaurant}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}&minRating=${MIN_RATING}`
    const result: DistanceResult[] = (await axios.get(URL)).data
    return result
}

export const createReservation = async (
    reservationDetails: Reservation
): Promise<number> => {
        let result: number = 500
        const URL = `${Urls.reservations}/create-reservation`
        await axios.post(URL, reservationDetails)
        .then(function(response) {
            result = response.status
        })
        .catch(function(error) {
            Alert.alert(  
                'Something is wrong',  
                'Please try again',
                [  
                    {text: 'OK'},  
                ]  
            )
            console.log(error.response.data)
            result = error.response.status
        })
        return result
}
export const getRestaurantImage = async (imageName: string) => {
    const URL = `${Urls.restaurant}/restaurant-image?imageName=${imageName}`
    const response = (await axios.get(URL)).data
    return response.image
}
