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
} from '../../components/VerticalScrollingSection/VerticalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {reservations_style} from './styles.js'
import axios from 'axios'
import {Reservation, ReservationRaw, Restaurant} from '../../shared/types'
import {TileType} from '../../shared/enums'

var user_id: number

const Reservations = ({navigation}: any) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [userReservations, showUserReservations] = useState<
        Reservation[]
    >([])

    useEffect(() => {
        retrieveUserSession()
    }, [])

    useEffect(() => {
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
        const reservationsRaw: ReservationRaw[] = (await axios.get(URL)).data
        var reservations: Reservation[] = []
        var reservation: Reservation = {
            id: 0,
            restaurant: {} as any,
            id_user: 0,
            dateTime: '',
            n_people: 0
        }
        for (const key in reservationsRaw) {
            if (reservationsRaw.hasOwnProperty(key)) {
                const value = reservationsRaw[key];

                // retrive restaurant data
                const URL = `http://localhost:3000/restaurants/find-restaurant/${value["id_restaurant"]}`
                console.log('axios call made')
                reservation["id"] = value["id"]
                reservation["restaurant"] = (await axios.get(URL)).data
                reservation["id_user"] = value["id_user"]
                reservation["dateTime"] = value["dateTime"]
                reservation["n_people"] = value["n_people"]

                reservations.push(reservation)
            }
        }
        console.log(reservations)
        setLoading(false)
        showUserReservations(reservations)
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