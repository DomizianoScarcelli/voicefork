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
    RestaurantTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {homepage_style} from './styles.js'
import {Restaurant} from '../../shared/types'
import {useGeolocation} from '../../hooks/useLocation'
import axios from 'axios'
import {LatLng} from '../../shared/types'

const Homepage = ({navigation}: any) => {
    const coordinates = useGeolocation()
    const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([])

    useEffect(() => {
        retrieveUserSession()
    }, [])

    useEffect(() => {
        console.log(coordinates)
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
        const URL = `http://localhost:3000/restaurants/find-restaurants-nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=2000`
        const res = await axios.get(URL)
        return res.data
    }

    const nearbyData: Restaurant[] = [
        {
            id: '1',
            name: 'La Taverna Relais Castrum Boccea',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
        {
            id: '2',
            name: 'Palmerie Pokè Torrevecchia',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
        {
            id: '3',
            name: 'Nice Restaurant',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
        {
            id: '4',
            name: 'Restaurant 4',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
        {
            id: '5',
            name: 'Restaurant 5',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
        {
            id: '6',
            name: 'Restaurant 6',
            cuisine: 'Mediterranean',
            averagePrice: 25,
            image: 'https://picsum.photos/100',
        },
    ]

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
                    renderItem={({item}) => (
                        <CuisineTile name={item.name} image={item.image} />
                    )}
                />
                <HorizontalScrollingSection
                    title={'Nearby'}
                    data={nearbyData}
                    showMore={true}
                    renderItem={({item}) => (
                        <RestaurantTile restaurant={item} />
                    )}
                />
                <HorizontalScrollingSection
                    title={'Top picks for you'}
                    data={nearbyData}
                    renderItem={({item}) => (
                        <RestaurantTile restaurant={item} />
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
