import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from "react-redux";

import { BottomNavigation } from './src/components';
import { Homepage, Reservations } from './src/views';
import Welcome from './src/views/Welcome/Welcome';

function RootNavigation() {
    return (
        //TO DO: REDEFINE ALL NAVIGATION LOGIC!
        <Welcome />
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