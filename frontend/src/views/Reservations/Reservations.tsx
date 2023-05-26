import React, {useEffect, useState} from 'react'
import {View, Text, SafeAreaView, Alert, TouchableOpacity} from 'react-native'
import {Colors, FontSize, Fonts, Spacing} from '../../constants'
import EncryptedStorage from 'react-native-encrypted-storage'
import VerticalScrollingSection, {
    ReservationTile,
    LoadingReservationTile,
} from '../../components/VerticalScrollingSection/VerticalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {reservations_style} from './styles.js'
import {
    Reservation,
    ReservationWithRestaurant,
    Restaurant,
} from '../../shared/types'
import axios from 'axios'
import {SearchStrategy} from '../../shared/enums'
import {useSession} from '../../hooks/useSession'

const Reservations = ({navigation}: any) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const userId = useSession(navigation)
    const [userReservations, setReservations] = useState<
        ReservationWithRestaurant[]
    >([])

    useEffect(() => {
        console.log('userId', userId)
        if (userId !== undefined) getUserReservations(userId)
    }, [userId])

    const homepage = async () => {
        try {
            navigation.navigate('Homepage')
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
        const reservations: Reservation[] = (await axios.get(URL)).data

        console.log(reservations)

        const reservationsWithRestaurant: ReservationWithRestaurant[] = []

        for (const key in reservations) {
            if (reservations.hasOwnProperty(key)) {
                const value = reservations[key]

                // retrive restaurant data
                const URL = `http://localhost:3000/restaurants/find-restaurant/${value.id_restaurant}`
                console.log(`axios call made: ${URL}`)
                const restaurant: Restaurant = (await axios.get(URL)).data

                // separate dateTime and format them correctly
                const dateTime = value.dateTime

                const date = dateTime.toString().split('T')[0]
                const formattedDate = new Date(date)
                    .toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })
                    .replace(/\//g, '/')

                const time = dateTime.toString().split('T')[1].split('.')[0]
                const [hours, minutes] = time.split(':')
                const formattedTime = `${hours}:${minutes}`

                const new_reservation: ReservationWithRestaurant = {
                    id: value.id,
                    id_user: value.id_user,
                    restaurant: restaurant,
                    date: formattedDate,
                    time: formattedTime,
                    n_people: value.n_people,
                }

                reservationsWithRestaurant.push(new_reservation)
            }
        }
        console.log('setting')
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
                <Navbar
                    onSearch={query =>
                        navigation.navigate('Search', {
                            query: query,
                            searchStrategy: SearchStrategy.KEYWORD,
                        })
                    }
                    navigation={navigation}
                    currentView={'Reservations'}
                />
            </SafeAreaView>
            <View style={reservations_style.main_view}>
                {isLoading ? (
                    // Loading tile
                    <LoadingReservationTile />
                ) : userReservations.length != 0 ? (
                    // Reservations tile
                    <VerticalScrollingSection
                        title={'My reservations'}
                        data={userReservations}
                        isLoading={isLoading}
                        renderItem={({
                            item,
                        }: {
                            item: ReservationWithRestaurant
                        }) => (
                            <ReservationTile
                                reservation={item}
                                navigation={navigation}
                            />
                        )}
                    />
                ) : (
                    // Empty tile
                    <View style={reservations_style.main_view}>
                        <Text
                            style={{
                                fontFamily: Fonts['poppins-bold'],
                                color: Colors.black,
                                fontSize: FontSize.medium,
                                textAlign: 'center',
                            }}>
                            {
                                "You haven't made any reservations yet.. \n\n Go to the homepage to make one!"
                            }
                        </Text>
                        <TouchableOpacity
                            onPress={() => homepage()}
                            style={{
                                backgroundColor: Colors.green,
                                paddingVertical: Spacing,
                                paddingHorizontal: Spacing,
                                width: '100%',
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
                                Homepage
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    )
}

export default Reservations
