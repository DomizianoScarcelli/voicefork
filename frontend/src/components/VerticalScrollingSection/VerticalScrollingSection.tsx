import {ListRenderItem, Text, FlatList, View, Image } from 'react-native'
import {FontSize, Fonts, Colors} from '../../constants'
import {ReservationWithRestaurant} from '../../shared/types'
import {styles} from './styles'
import {TileType} from '../../shared/enums'

type VerticalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<any>
    showMore?: boolean
    isLoading: boolean
    tileType: TileType
}

const VerticalScrollingSection = ({
    title,
    data,
    renderItem,
    showMore,
    isLoading,
    tileType,
    ...props
}: VerticalScrollingSectionProps) => {
    const renderLoadingTile = () => {
        return tileType == TileType.RESERVATION ? (
            <LoadingReservationTile />
        ) : (
            <LoadingNoneTile />
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

//const ReservationTile = ({reservation}: {reservation: ReservationWithRestaurant}) => {
const ReservationTile = ({reservation}: {reservation: number}) => {
    return (
        <View style={styles.reservationTileContainer}>
            {/* <Image
                source={{uri: 'https://picsum.photos/100'}}
                style={styles.restaurantTileImage}></Image> */}
            <Text style={styles.mediumBoldText}>{reservation}</Text>
            {/* <Text style={styles.mediumBoldText}>{reservation.restaurant.name}</Text>
            <Text style={styles.mediumBoldText}>{reservation.restaurant.cuisines}</Text>
            <Text style={styles.mediumBoldText}>{reservation.dateTime}</Text>
            <Text style={styles.mediumBoldText}>{reservation.n_people}</Text> */}
        </View>
    )
}

const NoneTile = () => {
    return (
        <View style={styles.noneTileContainer}>
            <Text style={styles.mediumBoldText}>{'There is no reservation'}</Text>
        </View>
    )
}

const LoadingReservationTile = () => {
    return (
        <View style={styles.reservationTileContainer}>
            <View style={styles.loadingImage} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
            <View style={styles.loadingText} />
        </View>
    )
}

const LoadingNoneTile = () => {
    return (
        <View style={styles.noneTileContainer}>
            <View style={styles.loadingText} />
        </View>
    )
}

export default VerticalScrollingSection
export {ReservationTile, LoadingReservationTile, NoneTile, LoadingNoneTile}