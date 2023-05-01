import {ListRenderItem, Text, FlatList, View, Image} from 'react-native'
import {Restaurant} from '../../shared/types'
import {styles} from './styles'
import {metersToKm} from '../../utils/geolocationUtils'

type HorizontalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<any>
    showMore?: boolean
    isLoading: boolean
}

const HorizontalScrollingSection = ({
    title,
    data,
    renderItem,
    showMore,
    isLoading,
    ...props
}: HorizontalScrollingSectionProps) => {
    return (
        <View style={{display: 'flex'}}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                {showMore ? <Text style={styles.moreText}>MORE</Text> : <></>}
            </View>
            <FlatList
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const RestaurantTile = ({
    restaurant,
    distance,
    isLoading,
}: {
    restaurant: Restaurant
    distance?: number
    isLoading: boolean
}) => {
    return isLoading ? (
        <View style={styles.restaurantTileContainer}>
            <View style={styles.loadingImage} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
        </View>
    ) : (
        <View style={styles.restaurantTileContainer}>
            <Image
                source={{uri: 'https://picsum.photos/100'}}
                style={styles.restaurantTileImage}></Image>
            <Text style={styles.mediumBoldText}>{restaurant.name}</Text>
            {restaurant.cuisines ? (
                <Text style={styles.smallRegularText}>
                    {restaurant.cuisines}
                </Text>
            ) : (
                <></>
            )}
            {restaurant.priceLevel ? (
                <Text style={styles.smallRegularText}>
                    {`Price level ${restaurant.priceLevel}`}
                </Text>
            ) : (
                <></>
            )}

            <Text style={styles.smallRegularSubText}>
                {`${metersToKm(distance!)} from you`}
            </Text>
        </View>
    )
}

const CuisineTile = ({
    name,
    image,
    isLoading,
}: {
    name: string
    image: string
    isLoading: boolean
}) => {
    return isLoading ? (
        <View style={styles.cuisineTileContainer}>
            <View style={styles.roundLoadingImage} />
            <View style={[styles.loadingText, styles.selfAlignedCenter]} />
        </View>
    ) : (
        <View style={styles.cuisineTileContainer}>
            <Image source={{uri: image}} style={styles.roundImage}></Image>
            <Text style={[styles.mediumBoldText, styles.centerdText]}>
                {name}
            </Text>
        </View>
    )
}

export default HorizontalScrollingSection
export {RestaurantTile, CuisineTile}
