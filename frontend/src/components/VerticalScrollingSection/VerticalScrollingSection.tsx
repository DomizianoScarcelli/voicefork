import {ListRenderItem, Text, FlatList, View, Image} from 'react-native'
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
    return (
        <View style={{display: 'flex'}}>
            {isLoading ? (
                <FlatList
                    horizontal={true}
                    data={[...Array(5)]}
                    renderItem={item => <LoadingReservationTile />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    )
}

const ReservationTile = ({
    reservation,
}: {
    reservation: ReservationWithRestaurant
}) => {
    return reservation == undefined ? (
        <>{reservation}</>
    ) : (
        <View>
            <View style={styles.mainContainer}>
                <Image
                    source={{uri: 'https://picsum.photos/100'}}
                    style={styles.restaurantTileImage}></Image>
                <View style={styles.reservationTextContainer}>
                    <Text style={styles.mediumBoldText}>
                        {reservation.restaurant.name}
                    </Text>
                    <Text style={styles.smallRegularSubText}>
                        {reservation.restaurant.cuisines}
                    </Text>
                    <Text style={styles.smallRegularText}>
                        {`Date: ${reservation.date}`}
                    </Text>
                    <Text style={styles.smallRegularText}>
                        {`Time: ${reservation.time}`}
                    </Text>
                    <Text style={styles.smallRegularText}>
                        {`Num. people: ${reservation.n_people}`}
                    </Text>
                </View>
            </View>
            <View style={styles.horizontalLine} />
        </View>
    )
}

const LoadingReservationTile = () => {
    return (
        <View>
            <View style={styles.mainContainer}>            
                <View style={styles.loadingImage} />
                <View style={styles.reservationTextContainer}>
                    <View style={styles.loadingText} />
                    <View style={styles.loadingText} />
                    <View style={styles.loadingText} />
                    <View style={styles.loadingText} />
                    <View style={styles.loadingText} />
                </View>
            </View>
        </View>
    )
}

export default VerticalScrollingSection
export {ReservationTile, LoadingReservationTile}
