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
    ReservationTile,
} from '../../components/HorizontalScrollingSection/HorizontalScrollingSection'
import Navbar from '../../components/Navbar/Navbar'
import {reservations_style} from './styles.js'
import axios from 'axios'
import {Reservation} from '../../shared/types'
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
        const result: Reservation[] = (await axios.get(URL)).data
        setLoading(false)
        showUserReservations(result)
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
                <HorizontalScrollingSection
                    title={'My reservations'}
                    data={userReservations}
                    isLoading={isLoading}
                    tileType={TileType.RESERVATION}
                    renderItem={({item}) => (
                        <ReservationTile
                            id_restaurant={item.id_restaurant}
                            dateTime={item.dateTime}
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