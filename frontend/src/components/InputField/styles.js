import {StyleSheet} from 'react-native'
import {Colors} from '../../constants'

export const input_field_style = StyleSheet.create({
    external_view: {
        marginBottom: 5,
    },

    internal_view: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        padding: 8,
    },

    text_input: {
        flex: 1,
        paddingVertical: 0,
    },

    button: {
        color: '#AD40AF',
        fontWeight: '700',
    },

    error_text: {
        marginTop: 7,
        color: Colors.lightRed,
    },
})
