import {ListRenderItem, Text, FlatList, View, Image} from 'react-native'
import {FontSize, Fonts, Colors} from '../../constants'
import {Restaurant} from '../../shared/types'
import {styles} from './styles'
type HorizontalScrollingSectionProps = {
    title: String
    data: Array<any>
    renderItem: ListRenderItem<any>
    showMore?: boolean
}

const HorizontalScrollingSection = ({
    title,
    data,
    renderItem,
    showMore,
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
                keyExtractor={item => item.id}></FlatList>
        </View>
    )
}

const RestaurantTile = ({restaurant}: {restaurant: Restaurant}) => {
    return (
        <View style={styles.restaurantTileContainer}>
            <Image
                source={{uri: restaurant.image}}
                style={styles.restaurantTileImage}></Image>
            <Text style={styles.mediumBoldText}>{restaurant.name}</Text>
            <Text style={styles.smallRegularText}>{restaurant.cuisine}</Text>
            <Text style={styles.smallRegularText}>
                {`${restaurant.averagePrice}\u20AC average price`}
            </Text>
        </View>
    )
}

const CuisineTile = ({name, image}: {name: string; image: string}) => {
    return (
        <View style={styles.cuisineTileContainer}>
            <Image source={{uri: image}} style={styles.roundImage}></Image>
            <Text style={styles.mediumBoldCenteredText}>{name}</Text>
        </View>
    )
}

export default HorizontalScrollingSection
export {RestaurantTile, CuisineTile}
