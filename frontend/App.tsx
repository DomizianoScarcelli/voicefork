import React from 'react';
import RootNavigation from "./navigation";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <RootNavigation />
  );
}

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Homepage, Reservations } from './src/views';
// import { NavigationContainer } from '@react-navigation/native';

// const Drawer = createDrawerNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName='Homepage'>
//         <Drawer.Screen name="Homepage" component={Homepage} />
//         <Drawer.Screen name="Reservations" component={Reservations} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;