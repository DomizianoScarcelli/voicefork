import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {SearchResult} from '../../shared/types'
import {styles} from './styles'
import {metersToKm} from '../../utils/geolocationUtils'
import RestaurantImage from '../RestaurantImage/RestaurantImage'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
    searchResult: SearchResult
    navigation: any
}

const SearchResultItem: React.FC<Props> = ({searchResult, navigation}) => {
    return (
        <View key={searchResult.restaurant.id} style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('RestaurantDetails', {
                        restaurant: searchResult.restaurant,
                    })
                }>
                <RestaurantImage
                    imageName={searchResult.restaurant.imageName}
                    style={styles.image}
                />
                <View style={styles.details}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {searchResult.restaurant.name}
                        </Text>
                        {searchResult.restaurant.avgRating != 0 ? (
                            <Text style={styles.rating}>
                                {searchResult.restaurant.avgRating}
                            </Text>
                        ) : (
                            <></>
                        )}
                    </View>

                    <Text style={styles.address}>
                        {`${metersToKm(searchResult.locationDistance)} • ${
                            searchResult.restaurant.address
                        }`}
                    </Text>
                    <Text style={styles.address}>
                        {`Price level ${searchResult.restaurant.priceLevel}`}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const LoadingSearchResultItem = ({id}: {id: number}) => {
    return (
        <View key={id} style={styles.container}>
            <View style={styles.loadingImage} />
            <View style={styles.loadingDetails}>
                <View style={styles.loadingTitle} />
                <View style={styles.loadingAddress} />
                <View style={styles.loadingAddress} />
            </View>
        </View>
    )
}

export default SearchResultItem
export {LoadingSearchResultItem}
