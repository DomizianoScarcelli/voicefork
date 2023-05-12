import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Homepage, Reservations } from '../../views';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer independent={true}>
        <Drawer.Navigator>
          <Drawer.Screen name="Homepage" component={Homepage} />
          <Drawer.Screen name="Reservations" component={Reservations} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer