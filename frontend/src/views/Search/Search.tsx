import React, {useEffect, useState} from 'react'
import {Text, SafeAreaView, ScrollView, View} from 'react-native'
import {Colors} from '../../constants'
import Navbar from '../../components/Navbar/Navbar'
import {SearchResult} from '../../shared/types'

import {useGeolocation} from '../../hooks/useLocation'
import SearchResultItem, {
    LoadingSearchResultItem,
} from '../../components/SearchResultItem/SearchResultItem'
import {getNearbyRestaurants, performSearch} from '../../utils/apiCalls'
import {DistanceResult} from '../../shared/types'
import {styles} from './styles'

const Search = ({route, navigation}: {route: any; navigation: any}) => {
    const coordinates = useGeolocation()
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const {query} = route.params

    useEffect(() => {
        const handleSearch = async () => {
            if (query == 'Nearby') {
                const data = await getNearbyRestaurants(coordinates)
                if (data == undefined) return
                const parsedData: SearchResult[] = data.map(
                    (item: DistanceResult) => {
                        return {
                            restaurant: item.restaurant,
                            nameDistance: 0,
                            locationDistance: item.distance,
                        }
                    },
                )
                setSearchResults(parsedData)
            } else {
                const data = await performSearch(query, coordinates)
                setSearchResults(data)
            }
        }
        handleSearch()
    }, [coordinates])

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                }}>
                <Navbar onSearch={query => performSearch(query, coordinates)} />
            </SafeAreaView>
            <ScrollView>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.title}>
                        {query == 'Nearby'
                            ? 'Nearby restaurants'
                            : `Search results for: `}
                    </Text>
                    {query != 'Nearby' ? (
                        <Text style={[styles.title, styles.query]}>
                            {query}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>
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
