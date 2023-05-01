import Geolocation from 'react-native-geolocation-service'
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import {Platform} from 'react-native'
import {LatLng} from '../shared/types'
import {useState} from 'react'

export const requestLocationPermission = () => {
    return Platform.OS == 'ios'
        ? requestLocationPermissionIOS()
        : requestLocationPermissionAndroid()
}

const requestLocationPermissionIOS = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    if (result == RESULTS.DENIED) {
        const permissionRes = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        )
        return RESULTS.GRANTED
    }
    return result
}
const requestLocationPermissionAndroid = async () => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    if (result == RESULTS.DENIED) {
        const permissionRes = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        )
        return RESULTS.GRANTED
    }
    return result
}

export const metersToKm = (meters: number): string => {
    if (meters > 1000) return `${(meters / 1000).toFixed(1)}km`
    return `${meters.toFixed(0)}m`
}
