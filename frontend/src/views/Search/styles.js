import {StyleSheet} from 'react-native'
import {Colors, FontSize, Fonts} from '../../constants'

export const styles = StyleSheet.create({
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts['poppins-semiBold'],
        fontSize: FontSize.medium,
        paddingTop: 15,
        color: Colors.black,
    },
    query: {
        color: Colors.darkGreen,
    },
})
