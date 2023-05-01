import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {SearchResult} from '../../shared/types'
import {styles} from './styles'
import {metersToKm} from '../../utils/geolocationUtils'
interface Props {
    searchResult: SearchResult
}

const SearchResultItem: React.FC<Props> = ({searchResult}) => {
    return (
        <View key={searchResult.restaurant.id} style={styles.container}>
            <Image
                source={{uri: 'https://picsum.photos/100'}}
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
