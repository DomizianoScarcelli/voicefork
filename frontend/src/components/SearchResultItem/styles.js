import {StyleSheet} from 'react-native'
import {Colors, FontSize, Fonts} from '../../constants'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 20,
    },
    details: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: FontSize.xLarge,
        fontFamily: Fonts['poppins-bold'],
        marginBottom: 8,
    },
    rating: {
        fontSize: FontSize.large,
        fontFamily: Fonts['poppins-bold'],
        color: Colors.white,
        marginBottom: 8,
        backgroundColor: Colors.green,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 7,
        overflow: 'hidden',
    },
    address: {
        fontSize: FontSize.medium,
        fontFamily: Fonts['poppins-regular'],
        color: Colors.black,
    },

    loadingImage: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    loadingDetails: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    loadingTitle: {
        width: '70%',
        height: 30,
        marginBottom: 8,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
    loadingAddress: {
        width: '100%',
        height: 20,
        marginBottom: 4,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
})
