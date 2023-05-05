import {LatLng, DistanceResult} from '../shared/types'
import {BASE_URL} from '../constants'
import axios from 'axios'
import {Component} from 'react'

export const performSearch = async (
    query: string,
    coordinates: LatLng | undefined,
) => {
    if (coordinates == undefined) return []
    console.log('Searching for restaurants')
    const MAX_DISTANCE = 10000000
    const LIMIT = 50
    const {latitude, longitude} = coordinates
    const URL = `${BASE_URL}/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
    const data = (await axios.get(URL)).data
    return data
}

export const getNearbyRestaurants = async (coordinates: LatLng | undefined) => {
    if (coordinates == undefined) return []
    const {latitude, longitude} = coordinates
    console.log('Getting nearby restaurants')
    const MAX_DISTANCE = 3000
    const LIMIT = 10
    const URL = `${BASE_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
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
    const URL = `${BASE_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}&minRating=${MIN_RATING}`
    const result: DistanceResult[] = (await axios.get(URL)).data
    return result
}
