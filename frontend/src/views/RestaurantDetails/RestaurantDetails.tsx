import React, {useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {Restaurant} from '../../shared/types'
import {Colors} from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage'
import {SafeAreaView} from 'react-native-safe-area-context'

function RestaurantDetails({route, navigation}: {route: any; navigation: any}) {
    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant>(
        route.params.restaurant,
    )

    const ratingScoreText = (score: number) => {
        if (score > 4) {
            return 'Excellent'
        } else if (score > 3) {
            return 'Great'
        } else if (score > 2) {
            return 'Average'
        } else {
            return 'Bad'
        }
    }

    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <RestaurantImage
                    imageName={restaurantDetails.imageName}
                    style={{height: 200}}
                />
                <View style={styles.restaurantContainer}>
                    <View style={styles.restaurantColumn}>
                        <Text style={styles.restaurantName}>
                            {restaurantDetails.name}
                        </Text>
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
                <View style={styles.restaurantContainer}>
                    <View style={styles.restaurantColumn}>
                        <View style={styles.restaurantRow}>
                            {restaurantDetails.cuisines !== ''
                                ? restaurantDetails.cuisines
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
                        <View style={styles.restaurantRow}>
                            <Ionicons
                                name={'cash-outline'}
                                size={20}
                                color={Colors.black}
                                style={{marginRight: 5}}
                            />
                            <Text>PRICE: {restaurantDetails.priceLevel}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                {restaurantDetails.avgRating != 0 ? (
                    <>
                        <View style={styles.restaurantContainer}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View style={styles.restaurantRow}>
                                    <Text style={styles.rating}>
                                        {restaurantDetails.avgRating}
                                    </Text>
                                    <Text style={styles.ratingText}>
                                        {ratingScoreText(
                                            restaurantDetails.avgRating,
                                        )}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.horizontalLine} />
                    </>
                ) : (
                    <></>
                )}
            </ScrollView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={styles.book_button} onPress={() => navigation.navigate("ReservationCreation", {restaurant: route.params.restaurant} )}>
                    <Text style={styles.button_text}>BOOK A TABLE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RestaurantDetails
