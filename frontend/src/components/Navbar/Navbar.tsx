import {View, TextInput} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Colors, Fonts, FontSize} from '../../constants'
import {navbar_style} from './styles'
//TODO: This has to be modified in order to work also with other types of navbar and not only the one
// on the homepage

//TODO: The Text input may be reused from the InputField component, but it requires some refactor.
const Navbar = () => {
    return (
        <View style={navbar_style.external_view}>
            <Ionicons name={'person-outline'} size={30} color={Colors.white} />
            <View style={navbar_style.input_field}>
                <TextInput
                    style={navbar_style.text_input}
                    placeholder="Type of food, restaurant name..."
                    autoCapitalize="sentences"
                    autoCorrect={false}
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
