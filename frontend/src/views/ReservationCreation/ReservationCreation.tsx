import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Reservation, Restaurant } from '../../shared/types'
import { ScrollView } from 'react-native-gesture-handler'
import { Calendar } from 'react-native-calendars'
import { styles } from './styles'
import EncryptedStorage from 'react-native-encrypted-storage'
import { Colors } from '../../constants'
import { Picker } from '@react-native-picker/picker';
import { getCurrentDate, getCurrentTime, getNextReservableTime, getReservableTimes } from '../../utils/dateTimeUtils'
import Ionicons from 'react-native-vector-icons/Ionicons'

function ReservationCreation({route, navigation}: {route: any, navigation: any}) {
    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant>(route.params.restaurant)
    const [reservationDetails, setReservationDetails] = useState<Reservation>({ idUser: 0, idRestaurant: route.params.restaurant.id, dateTime: new Date(), nPeople: 1 })
    const [dateTime, setDateTime] = useState( { date: "", time: getNextReservableTime() })
    const [reservableTimes, setReservableTimes] = useState<string[]>([])

    const retrieveUserSession = async () => {
        try {
            const session = await EncryptedStorage.getItem('user_session')
            if (session === null) {
                navigation.navigate('Welcome')
            } else {
                const sessionParsed = JSON.parse(session)
                setReservationDetails({...reservationDetails, idUser: sessionParsed.user_session.id})
            }
        } catch (error) {
            navigation.navigate('Welcome')
        }
    }

    const getReservableSeats = () => {
        let reservableSeats = []

        for (let i = 1; i < 20; i++) {
            reservableSeats.push(i)
        }

        return reservableSeats
    }

    return (
        <>
            <ScrollView>
                <Image source={{uri: 'https://i.pinimg.com/originals/3d/a3/7d/3da37dc6421f978a50e165466f221d72.jpg'}} style={{height: 200}} />
                <View style={styles.reservationCreationContainer}>
                    <View>
                        <Text style={styles.reservationCreationTitle}>Booking a table for: </Text>
                        <Text style={styles.reservationCreationTitle}>{restaurantDetails.name}</Text>
                    </View>
                    <View style={styles.restaurantColumn}>
                        <View style={styles.restaurantRow}>
                            <Ionicons name={"map-outline"} size={20} color={Colors.green} style={{marginRight: 5}}/>
                            <Text style={styles.restaurantAddress}>{restaurantDetails.address}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.reservationCreationContainer}>
                    <Text>Select a date:</Text>
                    <Calendar
                        theme={{
                            textSectionTitleColor: Colors.black,
                            selectedDayBackgroundColor: Colors.darkGreen,
                            selectedDayTextColor: Colors.white,
                            todayTextColor: Colors.darkGreen,
                            textDisabledColor: Colors.darkGray,
                            arrowColor: Colors.darkGreen,
                            indicatorColor: Colors.darkGreen
                        }}
                        onDayPress={day => {
                            setDateTime({...dateTime, date: day.dateString})
                            setReservableTimes(getReservableTimes(new Date(day.dateString)))
                            console.log(getNextReservableTime())
                        }}
                        markedDates={{
                            [dateTime.date]: {selected: true}
                        }}
                        minDate={getCurrentDate()}
                        current={dateTime.date}>
                    </Calendar>
                    {dateTime.date !== "" ? (
                        <>
                            <Text>Select a time:</Text>
                            <Picker
                                selectedValue={dateTime.time}
                                onValueChange={itemValue => {
                                    setDateTime({...dateTime, time: itemValue})
                                }}
                                dropdownIconColor={Colors.darkGreen}
                                style={{backgroundColor: Colors.white}}>
                                {reservableTimes !== null ? 
                                    reservableTimes.map((item) => (
                                        <Picker.Item label={item} value={item} />
                                )) : ""}
                            </Picker>
                            <Text>Select the number of people:</Text>
                            <Picker
                                selectedValue={reservationDetails.nPeople}
                                onValueChange={itemValue => {
                                    setReservationDetails({...reservationDetails, nPeople: itemValue})
                                }}
                                dropdownIconColor={Colors.darkGreen}
                                style={{backgroundColor: Colors.white}}>
                                {getReservableSeats().map((item) => (
                                        <Picker.Item label={item.toString()} value={item} />
                                ))}
                            </Picker>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <TouchableOpacity style={styles.book_button} onPress={() => navigation.navigate("ReservationCreation", {restaurant: route.params.restaurant} )}>
                                    <Text style={styles.button_text}>CONFIRM BOOKING</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ): ""}
                </View>
    
            </ScrollView>
        </>
    )
}

export default ReservationCreation