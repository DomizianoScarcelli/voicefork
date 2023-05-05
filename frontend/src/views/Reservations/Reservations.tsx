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
import VerticalScrollingSection, {
    ReservationTile,
    EmptyTile,
} from '../../components/VerticalScrollingSection/VerticalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {reservations_style} from './styles.js'
import {Reservation, ReservationWithRestaurant, Restaurant} from '../../shared/types'
import axios from 'axios'
import {TileType} from '../../shared/enums'

//GLOBAL
var user_id: number

const Reservations = ({navigation}: any) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [userReservations, setReservations] = useState<
        ReservationWithRestaurant[]
    >([])

    useEffect(() => {
        retrieveUserSession()
    }, [])

    useEffect(() => {
        console.log('userReservations', userReservations)
    }, [userReservations])

    useEffect(() => {
        console.log('user_id', user_id)
        if (user_id != undefined) {
            getUserReservations(user_id)
        }
    }, [user_id])

    const retrieveUserSession = async () => {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            } else {
                user_id = JSON.parse(session)["id"]
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

    const getUserReservations = async (user_id: number) => {
        const URL = `http://localhost:3000/reservations/find-user-reservations/${user_id}`
        console.log('axios call made')
        var reservations: Reservation[] = (await axios.get(URL)).data

        var reservationsWithRestaurant: ReservationWithRestaurant[] = []

        for (const key in reservations) {
            if (reservations.hasOwnProperty(key)) {
                const value = reservations[key];

                // retrive restaurant data
                const URL = `http://localhost:3000/restaurants/find-restaurant/${value["id_restaurant"]}`
                console.log('axios call made')
                var restaurant: Restaurant = (await axios.get(URL)).data

                var new_reservation: ReservationWithRestaurant = {
                    id: value["id"],
                    id_user: value["id_user"],
                    restaurant: restaurant,
                    dateTime: value["dateTime"],
                    n_people: value["n_people"],
                }

                reservationsWithRestaurant.push(new_reservation)
            }
        }
        console.log('reservationsWithRestaurant', reservationsWithRestaurant)
        setLoading(false)
        setReservations(reservationsWithRestaurant)
    }

    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: Colors.green,
                    // flex: 1,
                }}>
                <Navbar />
            </SafeAreaView>
            <ScrollView style={reservations_style.main_view}>
                {userReservations ? (
                    <VerticalScrollingSection
                        title={'My reservations'}
                        data={userReservations}
                        isLoading={isLoading}
                        tileType={TileType.RESERVATION}
                        renderItem={({item}) => (
                            <ReservationTile
                                reservation={item.reservation}
                            />
                        )}
                    />
                ) : (
                    <VerticalScrollingSection
                        title={'My reservations'}
                        data={userReservations}
                        isLoading={isLoading}
                        tileType={TileType.EMPTY}
                        renderItem={({item}) => (
                            <EmptyTile/>
                        )}
                    />
                )}
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

export default Reservations
