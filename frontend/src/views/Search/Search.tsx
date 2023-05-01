import React, {useEffect, useState} from 'react'
import {
    Text,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {Colors, FontSize, Fonts, Spacing} from '../../constants'
import EncryptedStorage from 'react-native-encrypted-storage'

import Navbar from '../../components/Navbar/Navbar'
import {searchStyles} from './styles.js'
import axios from 'axios'
import {LatLng, Restaurant, SearchResult} from '../../shared/types'
import {BASE_URL} from '../../constants'
import {useGeolocation} from '../../hooks/useLocation'
const Search = ({route, navigation}: {route: any; navigation: any}) => {
    const coordinates = useGeolocation()
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const {query} = route.params

    useEffect(() => {
        // performSearch()
    }, [coordinates])

    const performSearch = async () => {
        if (coordinates != undefined) {
            console.log('Searching for restaurants')
            const MAX_DISTANCE = 10000
            const LIMIT = 50
            const {latitude, longitude} = coordinates
            const query = 'Marione' //TODO: to be removed, handle "Nearby" as a special query
            const URL = `${BASE_URL}/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
            const data = (await axios.get(URL)).data
            console.log(data)
            setSearchResults(data)
        }
    }

    const tempSearchResult: SearchResult[] = [
        {
            restaurant: {
                id: 68696,
                name: 'Pasticceria Ai Due Pini',
                address: 'Via di Casalotti 198/200, 00166 Rome Italy',
                latitude: 41.91451,
                longitude: 12.36513,
                country: 'Italy',
                region: 'Lazio',
                province: '',
                city: 'ome',
                tags: 'Mid-range, Bakeries, Italian, Deli',
                cuisines: 'Italian, Deli, Wine Bar',
                specialDiets: '',
                priceLevel: '€€-€€€',
                meals: 'Breakfast',
                avgRating: 4.5,
                vegetarianFriendly: false,
                veganFriendly: false,
                glutenFree: false,
                reviewsNumber: 27,
            },
            nameDistance: 0.7391304347826086,
            locationDistance: 1360.03111159006,
        },
        {
            restaurant: {
                id: 57284,
                name: 'Casale La Rosa Rossa',
                address: 'Via Augusto Persichetti, 165, 00166 Rome Italy',
                latitude: 41.89357,
                longitude: 12.348207,
                country: 'Italy',
                region: 'Lazio',
                province: '',
                city: 'ome',
                tags: 'Mid-range, Italian, Pizza, Mediterranean',
                cuisines:
                    'Italian, Pizza, Romana, Lazio, Central-Italian, Mediterranean',
                specialDiets: 'Vegetarian Friendly, Gluten Free Options',
                priceLevel: '€€-€€€',
                meals: '',
                avgRating: 4.5,
                vegetarianFriendly: true,
                veganFriendly: false,
                glutenFree: true,
                reviewsNumber: 102,
            },
            nameDistance: 0.75,
            locationDistance: 1803.4632553499168,
        },
        {
            restaurant: {
                id: 65727,
                name: 'Pizzeria da Giancarlo',
                address: 'Via di Casalotti 233, 00166 Rome Italy',
                latitude: 41.91509,
                longitude: 12.36662,
                country: 'Italy',
                region: 'Lazio',
                province: '',
                city: 'ome',
                tags: 'Pizza',
                cuisines: 'Pizza',
                specialDiets: '',
                priceLevel: '',
                meals: 'Breakfast, Lunch, Dinner',
                avgRating: 4,
                vegetarianFriendly: false,
                veganFriendly: false,
                glutenFree: false,
                reviewsNumber: 5,
            },
            nameDistance: 0.7619047619047619,
            locationDistance: 1498.7569878216825,
        },
    ]

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                }}>
                <Navbar />
            </SafeAreaView>
            <ScrollView>
                {tempSearchResult.map((item: any, index: number) => (
                    <Text key={index.toString()}>{item.restaurant.name}</Text>
                ))}
            </ScrollView>
        </>
    )
}

export default Search
