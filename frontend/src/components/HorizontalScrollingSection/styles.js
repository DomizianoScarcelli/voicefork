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
        fontSize: FontSize.xLarge,
        fontFamily: Fonts['poppins-bold'],
        color: Colors.black,
    },
    moreText: {
        fontSize: FontSize.medium,
        color: Colors.green,
        fontFamily: Fonts['poppins-bold'],
    },
    restaurantTileContainer: {
        width: 150,
        height: 300, // width + paddingBottom
        paddingBottom: 150,
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
        fontSize: FontSize.small,
        fontFamily: Fonts['poppins-bold'],
        color: Colors.black,
    },
    smallRegularText: {
        fontSize: FontSize.small,
        fontFamily: Fonts['poppins-regular'],
        color: Colors.black,
    },
    smallRegularSubText: {
        fontSize: FontSize.small,
        fontFamily: Fonts['poppins-semiBold'],
        color: Colors.darkGreen,
    },
    centerdText: {
        textAlign: 'center',
    },
    loadingImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#cccccc',
        opacity: 0.5,
        borderRadius: 10,
    },
    roundLoadingImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#cccccc',
        opacity: 0.5,
        borderRadius: 100,
    },
    loadingText: {
        width: '80%',
        height: 15,
        marginTop: 10,
        backgroundColor: '#cccccc',
        opacity: 0.5,
        borderRadius: 5,
    },

    selfAlignedCenter: {
        alignSelf: 'center',
    },
})
