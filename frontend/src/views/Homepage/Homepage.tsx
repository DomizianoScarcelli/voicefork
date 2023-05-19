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
import {useSession} from '../../hooks/useSession'

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

    const logout = async () => {
        try {
            await EncryptedStorage.removeItem('user_session')
            navigation.navigate('Welcome')
        } catch (error) {
            Alert.alert(
                'Something is wrong',
                "We can't complete this task. Please, try again",
                [{text: 'OK'}],
            )
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

                <TouchableOpacity
                    onPress={() => navigation.navigate('Reservations')}
                    style={{
                        backgroundColor: Colors.green,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing,
                        width: '48%',
                        borderRadius: Spacing,
                        shadowColor: Colors.black,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing,
                    }}>
                    <Text
                        style={{
                            fontFamily: Fonts['poppins-bold'],
                            color: Colors.white,
                            fontSize: FontSize.large,
                            textAlign: 'center',
                        }}>
                        Reservations
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default Homepage
