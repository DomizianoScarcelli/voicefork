import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Alert,
    ScrollView,
} from 'react-native'
import {Colors} from '../../constants'
import EncryptedStorage from 'react-native-encrypted-storage'
import HorizontalScrollingSection, {
    CuisineTile,
    RestaurantTile,
    RestaurantLoadingTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'
import {DistanceResult} from '../../shared/types'
import {useGeolocation} from '../../hooks/useLocation'
import {
    getNearbyRestaurants,
    getTopRatedRestaurants,
} from '../../utils/apiCalls'
import {SearchStrategy} from '../../shared/enums'

const Homepage = ({navigation}: any) => {
    const [nearbyRestaurants, setNearbyRestaurants] = useState<
        DistanceResult[]
    >([])
    const [topPicksRestaurants, setTopPicksRestaurants] = useState<
        DistanceResult[]
    >([])
    const coordinates = useGeolocation()

    useEffect(() => {
        retrieveUserSession()
    }, [])

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

    const retrieveUserSession = async () => {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            }
        } catch (error) {
            navigation.navigate('Welcome')
        }
    }

    type CuisineData = {
        id: string
        name: string
        image: string
    }
    const cuisineData: CuisineData[] = [
        {
            id: '1',
            name: 'European',
            image: 'https://picsum.photos/100',
        },
        {
            id: '2',
            name: 'Italian',
            image: 'https://picsum.photos/100',
        },
        {
            id: '3',
            name: 'Mediterranean',
            image: 'https://picsum.photos/100',
        },
        {
            id: '4',
            name: 'Pizza',
            image: 'https://picsum.photos/100',
        },
    ]

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
