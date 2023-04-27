import {StyleSheet} from 'react-native'
import {Colors, Fonts, FontSize} from '../../constants'
export const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.xxLarge,
        fontFamily: Fonts['poppins-bold'],
    },
    moreText: {
        fontSize: FontSize.large,
        color: Colors.green,
        fontFamily: Fonts['poppins-bold'],
    },
    restaurantTileContainer: {
        width: 150,
        paddingBottom: 100,
        height: 250,
        margin: 10,
    },
    cuisineTileContainer: {
        width: 120,
        height: 145, // width + paddingBottom
        paddingBottom: 25,
        margin: 10,
    },
    roundImage: {
        height: '100%',
        borderRadius: 100,
        marginBottom: 5,
    },
    restaurantTileImage: {
        height: '100%',
        borderRadius: 10,
    },
    mediumBoldText: {
        fontSize: FontSize.medium,
        fontFamily: Fonts['poppins-bold'], //TODO: change it in semibold maybe
    },
    smallRegularText: {
        fontSize: FontSize.small,
        fontFamily: Fonts['poppins-regular'], //TODO: change it in semibold maybe
    },
    mediumBoldCenteredText: {
        fontSize: FontSize.medium,
        fontFamily: Fonts['poppins-bold'], //TODO: change it in semibold maybe
        textAlign: 'center',
    },
})
