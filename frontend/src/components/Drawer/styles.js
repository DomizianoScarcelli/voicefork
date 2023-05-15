import {StyleSheet} from 'react-native'
import {Colors, Fonts, FontSize} from '../../constants'

export const drawerStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  