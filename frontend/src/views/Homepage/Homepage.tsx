import React, {ReactComponentElement, useEffect, useState} from 'react'
import {
    Text,
    Button,
    SafeAreaView,
    Linking,
    Alert,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    FlatList,
    ListRenderItem,
    Image,
    PermissionStatus,
    StyleSheet,
} from 'react-native'
import InputField from '../../components/InputField/InputField'
import {Colors, FontSize, Fonts, Layout, Spacing} from '../../constants'
import {homepageText} from './styles.js'
import EncryptedStorage from 'react-native-encrypted-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HorizontalScrollingSection, {
    CuisineTile,
    LoadingCuisineTile,
    LoadingRestaurantTile,
    RestaurantTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'
import {DistanceResult, Restaurant} from '../../shared/types'
import {useGeolocation} from '../../hooks/useLocation'
import axios from 'axios'
import {LatLng} from '../../shared/types'
import {TileType} from '../../shared/enums'

const Homepage = ({navigation}: any) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const coordinates = useGeolocation()
    const [nearbyRestaurants, setNearbyRestaurants] = useState<
        DistanceResult[]
    >([])

    useEffect(() => {
        retrieveUserSession()
    }, [])

    useEffect(() => {
        console.log(nearbyRestaurants)
    }, [nearbyRestaurants])

    useEffect(() => {
        console.log(coordinates)
        if (coordinates != undefined) {
            getNearbyRestaurants(coordinates)
        }
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
        const URL = `http://localhost:3000/restaurants/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=1000&limit=10`
        console.log('axios call made')
        const result: DistanceResult[] = (await axios.get(URL)).data
        setLoading(false)
        setNearbyRestaurants(result)
    }

    const cuisineData = [
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
                    // flex: 1,
                }}>
                <Navbar />
            </SafeAreaView>
            <ScrollView style={homepage_style.main_view}>
                <HorizontalScrollingSection
                    title={'Cuisines'}
                    data={cuisineData}
                    isLoading={isLoading}
                    tileType={TileType.CUISINE}
                    renderItem={({item}) =>
                        isLoading ? (
                            <LoadingCuisineTile />
                        ) : (
                            <CuisineTile
                                name={item.name}
                                image={'https://picsum.photos/100'}
                            />
                        )
                    }
                />
                <HorizontalScrollingSection
                    title={'Nearby'}
                    data={nearbyRestaurants}
                    showMore={true}
                    isLoading={isLoading}
                    tileType={TileType.RESTAURANT}
                    renderItem={({item}) => (
                        <RestaurantTile
                            restaurant={item.restaurant}
                            distance={item.distance}
                        />
                    )}
                />
                <HorizontalScrollingSection
                    title={'Top picks for you'}
                    data={nearbyRestaurants}
                    isLoading={isLoading}
                    tileType={TileType.RESTAURANT}
                    renderItem={({item}) => (
                        <RestaurantTile
                            restaurant={item.restaurant}
                            distance={item.distance}
                        />
                    )}
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
