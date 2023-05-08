import React, {useEffect, useState} from 'react'
import {Text, SafeAreaView, ScrollView, View} from 'react-native'
import {Colors} from '../../constants'
import Navbar from '../../components/Navbar/Navbar'
import {SearchResult} from '../../shared/types'

import {useGeolocation} from '../../hooks/useLocation'
import SearchResultItem, {
    LoadingSearchResultItem,
} from '../../components/SearchResultItem/SearchResultItem'
import {
    getNearbyRestaurants,
    getTopRatedRestaurants,
    performSearch,
} from '../../utils/apiCalls'
import {DistanceResult} from '../../shared/types'
import {styles} from './styles'
import {SearchStrategy} from '../../shared/enums'

const Search = ({route, navigation}: {route: any; navigation: any}) => {
    const coordinates = useGeolocation()
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [searchStrategy, setsearchStrategy] = useState<SearchStrategy>(
        route.params.searchStrategy,
    )
    const [query, setquery] = useState<string>(route.params.query)

    const performSearchWithStrategy = async () => {
        switch (searchStrategy) {
            case SearchStrategy.KEYWORD:
                const keywordSearchResult = await performSearch(
                    query,
                    coordinates,
                )
                setSearchResults(keywordSearchResult)
                break
            case SearchStrategy.NEARBY:
                const nearbySearchResult = await getNearbyRestaurants(
                    coordinates,
                )
                if (nearbySearchResult == undefined) return
                const nearbyParsedData: SearchResult[] = nearbySearchResult.map(
                    (item: DistanceResult) => {
                        return {
                            restaurant: item.restaurant,
                            nameDistance: 0,
                            locationDistance: item.distance,
                        }
                    },
                )
                setSearchResults(nearbyParsedData)
                break
            case SearchStrategy.RATING:
                const topRatedResult = await getTopRatedRestaurants(coordinates)
                if (topRatedResult == undefined) return
                const topRatedParsedData: SearchResult[] = topRatedResult.map(
                    (item: DistanceResult) => {
                        return {
                            restaurant: item.restaurant,
                            nameDistance: 0,
                            locationDistance: item.distance,
                        }
                    },
                )
                setSearchResults(topRatedParsedData)
                break
        }
    }

    const rederSearchText = () => {
        switch (searchStrategy) {
            case SearchStrategy.KEYWORD:
                return 'Search results for: '
            case SearchStrategy.NEARBY:
                return 'Nearby restaurants'
            case SearchStrategy.RATING:
                return 'Top picks for you'
        }
    }

    const newSearch = async (query: string) => {
        setquery(query)
        setsearchStrategy(SearchStrategy.KEYWORD)
        setSearchResults([])
        const data = await performSearch(query, coordinates)
        setSearchResults(data)
    }

    useEffect(() => {
        performSearchWithStrategy()
    }, [coordinates])

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                }}>
                <Navbar onSearch={query => newSearch(query)} />
            </SafeAreaView>
            <ScrollView>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.title}>{rederSearchText()}</Text>
                    {searchStrategy == SearchStrategy.KEYWORD ? (
                        <Text style={[styles.title, styles.query]}>
                            {query}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>
                {searchResults.length == 0
                    ? [1, 2, 3, 4, 5].map((item: any, index: number) => (
                          <LoadingSearchResultItem key={index} id={item} />
                      ))
                    : searchResults.map((item: any, index: number) => (
                          <SearchResultItem key={index} searchResult={item} navigation={navigation} />
                      ))}
            </ScrollView>
        </>
    )
}

export default Search
