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
    //TODO: Implement this
    return RESULTS.BLOCKED
}
