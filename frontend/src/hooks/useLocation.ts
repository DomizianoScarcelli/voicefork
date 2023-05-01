import Geolocation from 'react-native-geolocation-service'
import {requestLocationPermission} from '../utils/geolocationUtils'
import {useState, useEffect} from 'react'
import {RESULTS} from 'react-native-permissions'
import {LatLng} from '../shared/types'

export const useGeolocation = () => {
    const [coordinates, setCoordinates] = useState<LatLng | undefined>()
    const [locationPermission, setLocationPermission] = useState<any>()

    useEffect(() => {
        const handleLocationPermission = async () => {
            const result = await requestLocationPermission()
            if (result != locationPermission) setLocationPermission(result)
        }
        handleLocationPermission()
    }, [locationPermission])

    console.log('useGeolocation called')
    if (locationPermission == RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                if (
                    JSON.stringify({latitude, longitude}) !=
                    JSON.stringify(coordinates)
                )
                    setCoordinates({latitude, longitude})
            },
            error => {
                // See error code charts below.
                console.log(
                    `An error occurred when trying to get the position: `,
                    error.code,
                    error.message,
                )
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )
    }

    return coordinates
}
