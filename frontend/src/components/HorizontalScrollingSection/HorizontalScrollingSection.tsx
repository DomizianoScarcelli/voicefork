import {ListRenderItem, Text, FlatList, View, Image} from 'react-native'
import {Restaurant} from '../../shared/types'
import {styles} from './styles'
import {metersToKm} from '../../utils/geolocationUtils'

type HorizontalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<any>
    onMoreClick?: () => any
}

function HorizontalScrollingSection({
    title,
    data,
    renderItem,
    onMoreClick,
    ...props
}: HorizontalScrollingSectionProps) {
    return (
        <View style={{display: 'flex'}}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                {onMoreClick ? (
                    <Text style={styles.moreText} onPress={onMoreClick}>
                        MORE
                    </Text>
                ) : (
                    <></>
                )}
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data.length == 0 ? Array(5) : data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const RestaurantTile = ({
    restaurant,
    distance,
    showRating,
}: {
    restaurant: Restaurant
    distance?: number
    showRating?: boolean
}) => {
    return (
        <View style={styles.restaurantTileContainer}>
            <Image
                source={{uri: 'https://picsum.photos/100'}}
                style={styles.restaurantTileImage}></Image>
            <Text style={styles.mediumBoldText}>{restaurant.name}</Text>
            {restaurant.cuisines ? (
                <Text style={styles.smallRegularText}>
                    {restaurant.cuisines.split(',').slice(0, 3).join(' •')}
                </Text>
            ) : (
                <></>
            )}
            {restaurant.priceLevel ? (
                <Text style={styles.smallRegularText}>
                    {`${restaurant.priceLevel}`}
                </Text>
            ) : (
                <></>
            )}
            {showRating ? (
                <Text style={styles.smallRegularSubText}>
                    {`Rated ${restaurant.avgRating} stars`}
                </Text>
            ) : (
                <Text style={styles.smallRegularSubText}>
                    {`${metersToKm(distance!)} from you`}
                </Text>
            )}
        </View>
    )
}

const CuisineTile = ({name, image}: {name: string; image: string}) => {
    return (
        <View style={styles.cuisineTileContainer}>
            <Image source={{uri: image}} style={styles.roundImage}></Image>
            <Text style={[styles.mediumBoldText, styles.centerdText]}>
                {name}
            </Text>
        </View>
    )
}

const CuisineLoadingTile = () => {
    return (
        <View style={styles.cuisineTileContainer}>
            <View style={styles.roundLoadingImage} />
            <View style={[styles.loadingText, styles.selfAlignedCenter]} />
        </View>
    )
}

const RestaurantLoadingTile = () => {
    return (
        <View style={styles.restaurantTileContainer}>
            <View style={styles.loadingImage} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
        </View>
    )
}

export default HorizontalScrollingSection
export {RestaurantTile, CuisineTile, CuisineLoadingTile, RestaurantLoadingTile}
