import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './Homepage/Homepage';
import Reservations from './Reservations/Reservations';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer independent={true}>
        <Drawer.Navigator>
          <Drawer.Screen name="Feed" component={Homepage} />
          <Drawer.Screen name="Article" component={Reservations} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer