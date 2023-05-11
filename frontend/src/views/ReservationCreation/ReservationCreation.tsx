import React, {useEffect, useState} from 'react'
import {Alert, Text, TouchableOpacity, View, SafeAreaView} from 'react-native'
import {ReservationCreationDetails, Restaurant} from '../../shared/types'
import {ScrollView} from 'react-native-gesture-handler'
import {Calendar} from 'react-native-calendars'
import {styles} from './styles'
import {Colors} from '../../constants'
import {Picker} from '@react-native-picker/picker'
import {
    constructDateTimeFromString,
    getCurrentDate,
    getNextReservableTime,
    getReservableTimes,
} from '../../utils/dateTimeUtils'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createReservation} from '../../utils/apiCalls'
import {useSession} from '../../hooks/useSession'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage'

function ReservationCreation({
    route,
    navigation,
}: {
    route: any
    navigation: any
}) {
    const userId = useSession(navigation)
    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant>(
        route.params.restaurant,
    )
    const [reservationDetails, setReservationDetails] =
        useState<ReservationCreationDetails>({
            id_user: 0,
            id_restaurant: route.params.restaurant.id,
            dateTime: new Date(),
            n_people: 1,
        })
    const [dateTime, setDateTime] = useState({
        date: '',
        time: getNextReservableTime(),
    })
    const [reservableTimes, setReservableTimes] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const getReservableSeats = () => {
        let reservableSeats = []
        for (let i = 1; i < 20; i++) {
            reservableSeats.push(i)
        }
        return reservableSeats
    }

    const validateDate = () => {
        let isValid = true
        if (!dateTime.date || !dateTime.time) {
            isValid = false
        }
        return isValid
    }

    const validateNPeople = () => {
        let isValid = true
        if (reservationDetails.n_people === null) {
            isValid = false
        }
        return isValid
    }

    const validateIdUser = () => {
        let isValid = true
        if (
            reservationDetails.id_user === null ||
            reservationDetails.id_user === 0
        ) {
            isValid = false
        }
        return isValid
    }

    const validateIdRestaurant = () => {
        let isValid = true
        if (
            reservationDetails.id_restaurant === null ||
            reservationDetails.id_restaurant === 0
        ) {
            isValid = false
        }
        return isValid
    }

    const validateData = () => {
        setLoading(true)
        const isValidDate = validateDate()
        const isValidNPeople = validateNPeople()
        const isValidIdUser = validateIdUser()
        const isValidIdRestaurant = validateIdRestaurant()

        if (
            isValidDate &&
            isValidNPeople &&
            isValidIdUser &&
            isValidIdRestaurant
        ) {
            createNewReservation()
        } else {
            Alert.alert(
                'Something is wrong',
                'Please, check your data and try again',
                [{text: 'OK'}],
            )
            setLoading(false)
        }
    }

    const createNewReservation = async () => {
        let formData = {
            id_user: reservationDetails.id_user,
            id_restaurant: reservationDetails.id_restaurant,
            dateTime: reservationDetails.dateTime,
            n_people: reservationDetails.n_people,
        }

        const resultStatus = await createReservation(formData)
        if (resultStatus === 200) {
            Alert.alert(
                'Reservation added successfully',
                `Booked a table at ${restaurantDetails.name}, ${dateTime.date} at ${dateTime.time} for ${reservationDetails.n_people}`,
                [{text: 'OK', onPress: () => navigation.navigate('Homepage')}],
            )
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userId !== undefined) {
            setReservationDetails({...reservationDetails, id_user: userId})
        }
    }, [userId])

    return (
        <SafeAreaView>
            <ScrollView>
                <RestaurantImage
                    imageName={restaurantDetails.imageName}
                    style={{height: 200}}
                />
                <View style={styles.reservationCreationContainer}>
                    <View>
                        <Text style={styles.reservationCreationTitle}>
                            Booking a table at:{' '}
                        </Text>
                        <Text style={styles.reservationCreationTitle}>
                            {restaurantDetails.name}
                        </Text>
                    </View>
                    <View style={styles.restaurantColumn}>
                        <View style={styles.restaurantRow}>
                            <Ionicons
                                name={'map-outline'}
                                size={20}
                                color={Colors.green}
                                style={{marginRight: 5}}
                            />
                            <Text style={styles.restaurantAddress}>
                                {restaurantDetails.address}
                            </Text>
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
                            indicatorColor: Colors.darkGreen,
                        }}
                        onDayPress={day => {
                            setDateTime({...dateTime, date: day.dateString})
                            setReservableTimes(
                                getReservableTimes(new Date(day.dateString)),
                            )
                            setReservationDetails({
                                ...reservationDetails,
                                dateTime: constructDateTimeFromString(
                                    day.dateString,
                                    dateTime.time,
                                ),
                            })
                        }}
                        markedDates={{
                            [dateTime.date]: {selected: true},
                        }}
                        minDate={getCurrentDate()}
                        current={dateTime.date}></Calendar>
                    {dateTime.date !== '' ? (
                        <>
                            <Text>Select a time:</Text>
                            <Picker
                                selectedValue={dateTime.time}
                                onValueChange={itemValue => {
                                    setDateTime({...dateTime, time: itemValue})
                                    setReservationDetails({
                                        ...reservationDetails,
                                        dateTime: constructDateTimeFromString(
                                            dateTime.date,
                                            itemValue,
                                        ),
                                    })
                                }}
                                dropdownIconColor={Colors.darkGreen}
                                itemStyle={{height: 150}}
                                style={{
                                    backgroundColor: Colors.white,
                                }}>
                                {reservableTimes !== null
                                    ? reservableTimes.map((item, index) => (
                                          <Picker.Item
                                              label={item}
                                              value={item}
                                              key={index}
                                          />
                                      ))
                                    : ''}
                            </Picker>
                            <Text>Select the number of people:</Text>
                            <Picker
                                selectedValue={reservationDetails.n_people}
                                onValueChange={itemValue => {
                                    setReservationDetails({
                                        ...reservationDetails,
                                        n_people: itemValue,
                                    })
                                }}
                                itemStyle={{height: 150}}
                                dropdownIconColor={Colors.darkGreen}
                                style={{
                                    backgroundColor: Colors.white,
                                }}>
                                {getReservableSeats().map((item, index) => (
                                    <Picker.Item
                                        label={item.toString()}
                                        value={item}
                                        key={index}
                                    />
                                ))}
                            </Picker>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    style={styles.book_button}
                                    onPress={() => validateData()}
                                    disabled={loading}>
                                    <Text style={styles.button_text}>
                                        {loading
                                            ? 'RESERVING A TABLE...'
                                            : 'CONFIRM BOOKING'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        ''
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReservationCreation
