import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from "react-redux";

import { BottomNavigation } from './src/components';
import { Welcome, Registration } from './src/views';

function RootNavigation() {
    const Stack = createStackNavigator();

    return (
        //TO DO: REDEFINE ALL NAVIGATION LOGIC!
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName = {"Welcome"}
            screenOptions={{
                headerShown: false
              }}>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Registration" component={Registration}/>
            </Stack.Navigator>
        </NavigationContainer>
        /**<NavigationContainer
        linking = {{
            prefixes: ['voicefork://'],
            config: {
                screens: {
                    Homepage: 'homepage',
                    Reservations: 'reservations',
                    Settings: 'settings',
                }
            }
        }}>
            <BottomNavigation />
        </NavigationContainer>*/
    );
};

export default RootNavigation