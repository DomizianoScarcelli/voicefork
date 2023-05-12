// ### DEFAULT ###

// import {View, TextInput} from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import {Colors} from '../../constants'
// import {navbarStyle} from './styles'
// //TODO: This has to be modified in order to work also with other types of navbar and not only the one
// // on the homepage

// interface NavbarProps {
//     onSearch: (input: string) => void
// }
// //TODO: The Text input may be reused from the InputField component, but it requires some refactoring.
// const Navbar = ({onSearch}: NavbarProps) => {
//     const handleEndEditing = (event: any) => {
//         const item = event.nativeEvent.text
//         onSearch(item)
//     }

//     return (
        // <View style={navbarStyle.mainContainer}>
        //     <Ionicons name={'person-outline'} size={30} color={Colors.white} />
        //     <View style={navbarStyle.searchBar}>
        //         <TextInput
        //             style={navbarStyle.text}
        //             placeholder="Type of food, restaurant name..."
        //             autoCapitalize="sentences"
        //             autoCorrect={false}
        //             onEndEditing={handleEndEditing}
        //         />
        //         <Ionicons
        //             name={'search-outline'}
        //             size={20}
        //             color={Colors.black}
        //             style={{position: 'absolute', left: 15}}
        //         />
        //     </View>

        //     <Ionicons name={'location'} size={30} color={Colors.white} />
        // </View>
//     )
// }

// export default Navbar

// ### TEST ###

import React, { useState } from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Colors} from '../../constants'
import {navbarStyle} from './styles'
//TODO: This has to be modified in order to work also with other types of navbar and not only the one
// on the homepage

interface NavbarProps {
    onSearch: (input: string) => void
}
//TODO: The Text input may be reused from the InputField component, but it requires some refactoring.
const Navbar = ({onSearch}: NavbarProps) => {
    const handleEndEditing = (event: any) => {
        const item = event.nativeEvent.text
        onSearch(item)
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <View style={navbarStyle.mainContainer}>
            <View style={styles.container}>
                <View style={navbarStyle.mainContainer}>
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                        <Ionicons name={isMenuOpen ? 'close' : 'menu'} size={24} color="white" />
                    </TouchableOpacity>
                <View style={navbarStyle.searchBar}>
                    <TextInput
                        style={navbarStyle.text}
                        placeholder="Type of food, restaurant name..."
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        onEndEditing={handleEndEditing}
                    />
                    <Ionicons
                        name={'search-outline'}
                        size={20}
                        color={Colors.black}
                        style={{position: 'absolute', left: 15}}
                    />
                </View>
                <Ionicons name={'location'} size={30} color={Colors.white} />
            </View>
            {isMenuOpen && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>Elemento 1</Text>
                    <Text>Elemento 2</Text>
                    <Text>Elemento 3</Text>
                </View>
            )}
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ff6f00',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    menuButton: {
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    menu: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      padding: 16,
      alignItems: 'flex-start',
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
  });

export default Navbar
