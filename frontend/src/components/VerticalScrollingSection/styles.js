import {StyleSheet} from 'react-native'
import { Colors, FontSize, Fonts } from '../../constants'
export const styles = StyleSheet.create({
    reservationTextContainer: {
    flex: 1,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.xxLarge,
        fontFamily: Fonts['poppins-bold'],
        color: Colors.black,
    },
    moreText: {
        fontSize: FontSize.large,
        color: Colors.green,
        fontFamily: Fonts['poppins-bold'],
    },
    reservationTileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundImage: {
        height: '100%',
        borderRadius: 100,
        marginBottom: 5,
    },
    restaurantTileImage: {
        borderRadius: 10,
        width: 120, 
        height: 120, 
        marginRight: 10, 
    },
    mediumBoldText: {
        fontSize: FontSize.medium,
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
        borderRadius: 10,
        width: 120, 
        height: 120, 
        marginRight: 10, 
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
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.darkGray,
        marginVertical: 10
    },
})
