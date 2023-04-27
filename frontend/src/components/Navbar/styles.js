import {StyleSheet} from 'react-native'
import {Colors, Fonts, FontSize} from '../../constants'

export const navbar_style = StyleSheet.create({
    external_view: {
        backgroundColor: Colors.green,
        width: '100%',
        height: '25%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        gap: 10,
        maxHeight: 60,
    },
    input_field: {
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
    text_input: {
        fontFamily: Fonts['poppins-regular'], //TODO insert bold, ios has problems
        fontSize: FontSize.small,
        alignSelf: 'flex-start',
    },
})
