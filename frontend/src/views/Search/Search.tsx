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
import SearchResultItem, {
    LoadingSearchResultItem,
} from '../../components/SearchResultItem/SearchResultItem'
const Search = ({route, navigation}: {route: any; navigation: any}) => {
    const coordinates = useGeolocation()
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const {query} = route.params

    useEffect(() => {
        performSearch()
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
            setSearchResults(data)
        }
    }

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                }}>
                <Navbar />
            </SafeAreaView>
            <ScrollView>
                {searchResults.length == 0
                    ? [1, 2, 3, 4, 5].map(item => (
                          <LoadingSearchResultItem id={item} />
                      ))
                    : searchResults.map((item: any, index: number) => (
                          <SearchResultItem searchResult={item} />
                      ))}
            </ScrollView>
        </>
    )
}

export default Search
