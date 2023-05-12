// #### DEFAULT ####

import React from 'react';
import RootNavigation from "./navigation";
import 'react-native-gesture-handler';

export default function App() {
  return (
      <RootNavigation />
  );
}

// #### TEST ####

// import React from 'react';
// import RootNavigation from "./navigation";
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';


// import {View, TextInput} from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import {Colors} from './src/constants'
// import {navbarStyle} from './src/components/Navbar/styles'
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Homepage, Reservations } from './src/views';

// const Drawer = createDrawerNavigator();
// //TODO: This has to be modified in order to work also with other types of navbar and not only the one
// // on the homepage

// interface NavbarProps {
//     onSearch: (input: string) => void
// }
// //TODO: The Text input may be reused from the InputField component, but it requires some refactoring.
// // const App = ({onSearch}: NavbarProps) => {
// //     const handleEndEditing = (event: any) => {
// //         const item = event.nativeEvent.text
// //         onSearch(item)
// //     }

// function App() {
//     return (
//         <View style={navbarStyle.mainContainer}>
//           <NavigationContainer independent={true}>
//             <Drawer.Navigator>
//                 <Drawer.Screen name="Homepage" component={Homepage} />
//                 <Drawer.Screen name="Reservations" component={Reservations} />
//             </Drawer.Navigator>
//             <Ionicons name={'person-outline'} size={30} color={Colors.white} />
//             {/* <View style={navbarStyle.searchBar}>
//                 <TextInput
//                     style={navbarStyle.text}
//                     placeholder="Type of food, restaurant name..."
//                     autoCapitalize="sentences"
//                     autoCorrect={false}
//                     onEndEditing={handleEndEditing}
//                 />
//                 <Ionicons
//                     name={'search-outline'}
//                     size={20}
//                     color={Colors.black}
//                     style={{position: 'absolute', left: 15}}
//                 />
//             </View>

//             <Ionicons name={'location'} size={30} color={Colors.white} /> */}
//           </NavigationContainer>
          
//           <RootNavigation />
//         </View>
//     )
// }