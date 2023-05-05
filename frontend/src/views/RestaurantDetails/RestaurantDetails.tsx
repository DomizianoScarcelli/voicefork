import React, { useState } from "react"
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { Restaurant } from "../../shared/types"
import { Navbar, BackButton } from "../../components"
import { Colors, FontSize } from "../../constants"
import { SearchStrategy } from "../../shared/enums"
import Ionicons from "react-native-vector-icons/Ionicons"

function RestaurantDetails({route, navigation}: {route: any; navigation: any}) {
    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant>(route.params.restaurant)

    const ratingScoreText = (score: number) => {
        if (score > 4) {return "Excellent"}
        else if (score > 3) {return "Great"}
        else if (score > 2) {return "Average"}
        else {return "Bad"}
    }

    return (
        <>
            <ScrollView>
                <Image source={{uri: 'https://picsum.photos/100'}} style={styles.restaurantImage} />
                <View style={styles.restaurantContainer}>
                    <Text style={styles.restaurantName}>{restaurantDetails.name}</Text>
                    <View style={styles.restaurantRow}>
                        <Ionicons name={"pin-outline"} size={20} color={Colors.green} style={{marginRight: 5}}/>
                        <Text>{restaurantDetails.address}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.restaurantContainer}>
                    <View style={styles.restaurantColumn}>
                        <Text>{restaurantDetails.cuisines}</Text>
                        <View style={styles.restaurantRow}>
                            <Ionicons name={"cash-outline"} size={20} color={Colors.green} style={{marginRight: 5}}/>
                            <Text>Price: {restaurantDetails.priceLevel}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                {restaurantDetails.avgRating != 0 ? (
                    <>
                        <View style={styles.restaurantContainer}>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <View style={styles.restaurantRow}>
                                        <Text style={styles.rating}>
                                            {restaurantDetails.avgRating}
                                        </Text>
                                        <Text style={styles.ratingText}>{ratingScoreText(restaurantDetails.avgRating)}</Text>
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
                <TouchableOpacity style={styles.book_button}>
                    <Text style={styles.button_text}>BOOK A TABLE</Text>
                </TouchableOpacity>
            </View>
        </>
            
    )
}

export default RestaurantDetails