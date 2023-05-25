import React, {useEffect, useState} from 'react'
import {SafeAreaView, Alert, ScrollView} from 'react-native'
import {Colors} from '../../constants'
import {cuisineData} from './cuisineData'
import HorizontalScrollingSection, {
    CuisineTile,
    RestaurantTile,
    RestaurantLoadingTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'
import {DistanceResult, CuisineData} from '../../shared/types'
import {useGeolocation} from '../../hooks/useLocation'
import {
    getNearbyRestaurants,
    getTopRatedRestaurants,
} from '../../utils/apiCalls'
import {SearchStrategy} from '../../shared/enums'
import {useSession} from '../../hooks/useSession'
import {Image} from 'react-native'

const Homepage = ({navigation}: any) => {
    const userId = useSession(navigation)
    const [nearbyRestaurants, setNearbyRestaurants] = useState<
        DistanceResult[]
    >([])
    const [topPicksRestaurants, setTopPicksRestaurants] = useState<
        DistanceResult[]
    >([])
    const coordinates = useGeolocation()

    useEffect(() => {
        console.log(coordinates)
        const populateData = async () => {
            const nearbyRestaurantsResult = await getNearbyRestaurants(
                coordinates,
            )
            const topRatedRestaurantsResult = await getTopRatedRestaurants(
                coordinates,
            )
            setNearbyRestaurants(nearbyRestaurantsResult)
            setTopPicksRestaurants(topRatedRestaurantsResult)
        }
        populateData()
    }, [coordinates])

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                }}>
                <Navbar
                    onSearch={query =>
                        navigation.navigate('Search', {
                            query: query,
                            searchStrategy: SearchStrategy.KEYWORD,
                        })
                    }
                    navigation={navigation}
                    currentView={'Homepage'}
                />
            </SafeAreaView>
            <ScrollView style={homepage_style.main_view}>
                <HorizontalScrollingSection
                    title={'Cuisines'}
                    data={cuisineData}
                    renderItem={({item}: {item: CuisineData}) => (
                        <CuisineTile name={item.name} image={item.image} />
                    )}
                />
                <HorizontalScrollingSection
                    title={'Nearby'}
                    data={nearbyRestaurants}
                    onMoreClick={() =>
                        navigation.navigate('Search', {
                            searchStrategy: SearchStrategy.NEARBY,
                        })
                    }
                    renderItem={({item}: {item: DistanceResult}) =>
                        nearbyRestaurants.length == 0 ? (
                            <RestaurantLoadingTile />
                        ) : (
                            <RestaurantTile
                                restaurant={item.restaurant}
                                distance={item.distance}
                                navigation={navigation}
                            />
                        )
                    }
                />
                <HorizontalScrollingSection
                    title={'Top picks for you'}
                    data={topPicksRestaurants}
                    onMoreClick={() =>
                        navigation.navigate('Search', {
                            searchStrategy: SearchStrategy.RATING,
                        })
                    }
                    renderItem={({item}: {item: DistanceResult}) =>
                        topPicksRestaurants.length == 0 ? (
                            <RestaurantLoadingTile />
                        ) : (
                            <RestaurantTile
                                restaurant={item.restaurant}
                                distance={item.distance}
                                showRating={true}
                                navigation={navigation}
                            />
                        )
                    }
                />
            </ScrollView>
        </>
    )
}

export default Homepage
