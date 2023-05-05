import { StyleSheet } from 'react-native'
import { Colors, FontSize, Fonts, Spacing } from '../../constants'

export const styles = StyleSheet.create({
    restaurantContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },

    restaurantImage: {
        height: 200
    },

    restaurantName: {
        color: Colors.black,
        fontSize: FontSize.xLarge,
        fontFamily: Fonts["poppins-bold"],
    },

    restaurantRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    restaurantColumn: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },

    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10
    },

    rating: {
        fontSize: FontSize.large,
        fontFamily: Fonts['poppins-bold'],
        color: Colors.white,
        backgroundColor: Colors.green,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 7,
        overflow: 'hidden',
    },

    ratingText: {
        fontSize: FontSize.large,
        marginHorizontal: 5
    },

    book_button: {
        backgroundColor: Colors.green,
        paddingVertical: Spacing,
        paddingHorizontal: Spacing,
        width: "48%",
        borderRadius: Spacing,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
        position: "absolute",
        bottom: 10,
        alignItems: "center"
    },

    button_text: {
        fontFamily: Fonts["poppins-bold"],
        color: Colors.white,
        fontSize: FontSize.medium,
        textAlign: "center",
    }
})