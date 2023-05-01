import {StyleSheet} from 'react-native'
import {Colors, Fonts, FontSize} from '../../constants'

export const navbarStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.green,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        gap: 10,
        maxHeight: 60,
    },
    searchBar: {
        position: 'relative',
        flexGrow: 1,
        height: '70%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
    },
    text: {
        fontFamily: Fonts['poppins-regular'], //TODO insert bold, ios has problems
        fontSize: FontSize.small,
        alignSelf: 'flex-start',
    },
})
