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
    CuisineLoadingTile,
    RestaurantLoadingTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'
import {DistanceResult} from '../../shared/types'
import {useGeolocation} from '../../hooks/useLocation'
import axios from 'axios'
import {LatLng} from '../../shared/types'
import {BASE_URL} from '../../constants'

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
            if (coordinates != undefined) {
                await getNearbyRestaurants(coordinates)
                await getTopRatedRestaurants(coordinates)
            }
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

    const getNearbyRestaurants = async ({latitude, longitude}: LatLng) => {
        console.log('Getting nearby restaurants')
        const MAX_DISTANCE = 3000
        const LIMIT = 10
        const URL = `${BASE_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}`
        const result: DistanceResult[] = (await axios.get(URL)).data
        setNearbyRestaurants(result)
    }

    const getTopRatedRestaurants = async ({latitude, longitude}: LatLng) => {
        console.log('Getting top picks restaurants')
        const MAX_DISTANCE = 3000
        const LIMIT = 10
        const MIN_RATING = 4.0
        const URL = `${BASE_URL}/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${MAX_DISTANCE}&limit=${LIMIT}&minRating=${MIN_RATING}`
        const result: DistanceResult[] = (await axios.get(URL)).data
        setTopPicksRestaurants(result)
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
                <Navbar />
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
                        navigation.navigate('Search', {query: 'Nearby'})
                    }
                    renderItem={({item}: {item: DistanceResult}) =>
                        nearbyRestaurants.length == 0 ? (
                            <RestaurantLoadingTile />
                        ) : (
                            <RestaurantTile
                                restaurant={item.restaurant}
                                distance={item.distance}
                            />
                        )
                    }
                />
                <HorizontalScrollingSection
                    title={'Top picks for you'}
                    data={topPicksRestaurants}
                    renderItem={({item}: {item: DistanceResult}) =>
                        topPicksRestaurants.length == 0 ? (
                            <RestaurantLoadingTile />
                        ) : (
                            <RestaurantTile
                                restaurant={item.restaurant}
                                distance={item.distance}
                                showRating={true}
                            />
                        )
                    }
                />

                <TouchableOpacity
                    onPress={() => logout()}
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
                        Logout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default Homepage
