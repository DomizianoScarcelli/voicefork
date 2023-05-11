import {StyleSheet} from 'react-native'
import {Colors, FontSize, Spacing} from '../../constants'

export const styles = StyleSheet.create({
    reservationCreationContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
    },

    restaurantRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    restaurantColumn: {
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

    reservationCreationTitle: {
        color: Colors.black,
        fontSize: FontSize.xLarge,
        fontWeight: '500',
    },

    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.darkGray,
        marginVertical: 10,
    },

    book_button: {
        backgroundColor: Colors.green,
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
        alignItems: 'center',
        marginVertical: 10,
    },

    button_text: {
        color: Colors.white,
        fontSize: FontSize.medium,
        textAlign: 'center',
    },
})
