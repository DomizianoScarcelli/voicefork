import {StyleSheet} from 'react-native'
import {Colors, FontSize, Fonts, Spacing} from '../../constants'

export const styles = StyleSheet.create({
    reservationContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    reservationTitle: {
        color: Colors.black,
        fontSize: FontSize.xLarge,
        fontWeight: '500',
    },

    reservationRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    reservationColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },

    restaurantAddress: {
        flex: 1,
        width: 0,
        flexWrap: 'wrap',
        flexGrow: 1,
        flexShrink: 1,
    },

    restaurantCuisineItem: {
        margin: 1,
    },

    restaurantCuisineText: {
        backgroundColor: Colors.darkGray,
        color: Colors.black,
        paddingVertical: Spacing,
        paddingHorizontal: Spacing,
        borderRadius: Spacing,
        overflow: 'hidden',
    },

    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.darkGray,
        marginVertical: 10,
    },

    delete_booking_button: {
        backgroundColor: Colors.lightRed,
        paddingVertical: Spacing,
        paddingHorizontal: Spacing,
        width: '48%',
        borderRadius: Spacing,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },

    button_text: {
        color: Colors.white,
        fontSize: FontSize.medium,
        textAlign: 'center',
    },
})
