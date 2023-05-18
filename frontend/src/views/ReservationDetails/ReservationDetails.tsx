import React, {useEffect, useState} from 'react'
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {ReservationWithRestaurant} from '../../shared/types'
import {Colors} from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage'
import {SafeAreaView} from 'react-native-safe-area-context'
import { deleteReservation } from '../../utils/apiCalls'

function ReservationDetails({route, navigation}: {route: any; navigation: any}) {
    const [reservationDetails, setReservationDetails] = useState<ReservationWithRestaurant>(
        route.params.reservationDetails,
    )
    const [loading, setLoading] = useState(false)

    const startDeleteReservation = () => {
        Alert.alert(  
            'Delete Reservation',  
            'Do you want to delete this reservation?',  
            [  
                {text: 'No'},
                {text: 'Yes',
                onPress: () => confirmDeleteReservation()}
            ],
            {cancelable: true}
        )
    }

    const confirmDeleteReservation = async () => {
        setLoading(true)
        const resultStatus = await deleteReservation(reservationDetails.id)
        if (resultStatus === 200) {
            navigation.navigate("Reservations")
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <RestaurantImage
                    imageName={reservationDetails.restaurant.imageName}
                    style={{height: 200}}
                />
                <View style={styles.reservationContainer}>
                    <View style={styles.reservationColumn}>
                        <View>
                            <Text style={styles.reservationTitle}>
                                You booked a table at:
                            </Text>
                            <Text style={styles.reservationTitle}>
                                {reservationDetails.restaurant.name}
                            </Text>
                        </View>
                        <View style={styles.reservationRow}>
                            <Ionicons
                                name={'map-outline'}
                                size={20}
                                color={Colors.green}
                                style={{marginRight: 5}}
                            />
                            <Text style={styles.restaurantAddress}>
                                {reservationDetails.restaurant.address}
                            </Text>
                        </View>
                        <View style={styles.reservationRow}>
                        {reservationDetails.restaurant.cuisines !== ''
                            ? reservationDetails.restaurant.cuisines
                                    .split(',')
                                    .map((item, index) => (
                                        <View
                                            style={
                                                styles.restaurantCuisineItem
                                            }
                                            key={index}>
                                            <Text
                                                style={
                                                    styles.restaurantCuisineText
                                                }>
                                                {item.trim()}
                                            </Text>
                                        </View>
                                    ))
                            : ''}
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.reservationContainer}>
                    <View style={styles.reservationColumn}>
                        <View style={styles.reservationRow}>
                            <Ionicons
                                name={'calendar-outline'}
                                size={20}
                                color={Colors.black}
                                style={{marginRight: 5}}
                            />
                            <Text>Date: {reservationDetails.date}</Text>
                        </View>
                        <View style={styles.reservationRow}>
                            <Ionicons
                                name={'time-outline'}
                                size={20}
                                color={Colors.black}
                                style={{marginRight: 5}}
                            />
                            <Text>Time: {reservationDetails.time}</Text>
                        </View>
                        <View style={styles.reservationRow}>
                            <Ionicons
                                name={'people-outline'}
                                size={20}
                                color={Colors.black}
                                style={{marginRight: 5}}
                            />
                            <Text>Num. People: {reservationDetails.n_people}</Text>
                        </View>
                        <View style={styles.reservationRow}>
                            <Ionicons
                                name={'information-circle-outline'}
                                size={20}
                                color={Colors.black}
                                style={{marginRight: 5}}
                            />
                            <Text>Reservation ID: {reservationDetails.id}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
            </ScrollView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={styles.delete_booking_button} onPress={() => startDeleteReservation()} disabled={loading}>
                    <Text style={styles.button_text}>{loading ? "DELETING RESERVATION.." : "DELETE RESERVATION"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ReservationDetails
