import React, { useState , useEffect } from 'react';
import {View, TextInput, Text, TouchableOpacity, Modal } from 'react-native'
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

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <View style={navbarStyle.mainContainer}>   
            {/* Navbar contenente il pulsante per aprire il menu */}
            <TouchableOpacity onPress={openMenu}>
                <Text>Apri menu</Text>
            </TouchableOpacity>

            {/* Modal che mostra il menu */}
            <Modal visible={isMenuOpen} animationType="slide">
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
                <Text>Menu Content</Text>
                {/* Aggiungi qui gli elementi del menu */}
                <TouchableOpacity onPress={closeMenu}>
                    <Text>Chiudi menu</Text>
                </TouchableOpacity>
                </View>
            </Modal>
            
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
    )
}

export default Navbar
