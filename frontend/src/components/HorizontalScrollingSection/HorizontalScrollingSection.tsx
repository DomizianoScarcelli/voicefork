import {ListRenderItem, Text, FlatList, View, Image} from 'react-native'
import {FontSize, Fonts, Colors} from '../../constants'
import {Restaurant} from '../../shared/types'
import {styles} from './styles'
import {TileType} from '../../shared/enums'
import {metersToKm} from '../../utils/geolocationUtils'

type HorizontalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<any>
    showMore?: boolean
    isLoading: boolean
    tileType: TileType
}

const HorizontalScrollingSection = ({
    title,
    data,
    renderItem,
    showMore,
    isLoading,
    tileType,
    ...props
}: HorizontalScrollingSectionProps) => {
    const renderLoadingTile = () => {
        return tileType == TileType.RESTAURANT ? (
            <LoadingRestaurantTile />
        ) : (
            <LoadingCuisineTile />
        )
    }
    return (
        <View style={{display: 'flex'}}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                {showMore ? <Text style={styles.moreText}>MORE</Text> : <></>}
            </View>
            {isLoading ? (
                <FlatList
                    horizontal={true}
                    data={[...Array(5)]}
                    renderItem={item => renderLoadingTile()}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <FlatList
                    horizontal={true}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    )
}

const RestaurantTile = ({
    restaurant,
    distance,
}: {
    restaurant: Restaurant
    distance?: number
}) => {
    return (
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

const ReservationTile = ({id_restaurant, dateTime}: {id_restaurant: number; dateTime: Date}) => {
    return (
        <View style={styles.reservationTileContainer}>
            <Text style={[styles.mediumBoldText, styles.centerdText]}>
                {id_restaurant}
            </Text>
            <Text style={[styles.mediumBoldText, styles.centerdText]}>
                {dateTime}
            </Text>
        </View>
    )
}

const LoadingRestaurantTile = () => {
    return (
        <View style={styles.restaurantTileContainer}>
            <View style={styles.loadingImage} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
        </View>
    )
}

const LoadingCuisineTile = () => {
    return (
        <View style={styles.cuisineTileContainer}>
            <View style={styles.roundLoadingImage} />
            <View style={[styles.loadingText, styles.selfAlignedCenter]} />
        </View>
    )
}

const LoadingReservationTile = () => {
    return (
        <View style={styles.reservationTileContainer}>
            <View style={styles.roundLoadingImage} />
            <View style={[styles.loadingText, styles.selfAlignedCenter]} />
        </View>
    )
}

export default HorizontalScrollingSection
export {RestaurantTile, CuisineTile, ReservationTile, LoadingCuisineTile, LoadingRestaurantTile, LoadingReservationTile}
